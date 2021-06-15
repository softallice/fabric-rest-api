const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function enrollUser(userName, userPwd, userOrg) {
    let response;
    try {
        console.log(`Orgname: ${userOrg}`);
        const orgDomain = `${userOrg}.example.com`;
        const connectionFile = `connection-${userOrg}.json`;
        let caName = `ca.${orgDomain}`;

        // load the network configuration
        // const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        // let ccpPath = path.join(__dirname, '../../../../trust-id/fabric-samples/test-network/organizations/peerOrganizations', orgDomain, connectionFile);
        const ccpPath = '/opt/gopath/src/trust-id/fabric-samples/test-network/organizations/peerOrganizations/'+ orgDomain +'/' + connectionFile;     
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities[caName].url;
        const ca = new FabricCAServices(caURL);
        /*
        const caInfo = ccp.certificateAuthorities[caName];
        console.log('caInfo : ', caInfo)
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
        */

        // Create a new file system based wallet for managing identities.
        // const walletPath = path.join(process.cwd(), 'identity/wallet');
        const walletPath = path.join(__dirname, `./identity/wallet`);
        // const walletPath = '/opt/gopath/src/github.com/fabric-rest-api/src/blockchain/identity/wallet';
        const wallet = await Wallets.newFileSystemWallet(walletPath);
    
        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get(userName);
        if (identity) {
            console.log(`An identity for the admin user ${userName} already exists in the wallet`);
            response = { success: false, message: `An identity for the client user ${userName} already exists in the wallet` };
            return response;
        }

        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            response = { success: false, message: 'An identity for the admin user "admin" does not exist in the wallet' };
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: userName,
            role: 'client'
        }, adminUser);
        

        // Enroll the admin user, and import the new identity into the wallet.
        //userPwd
        // const enrollment = await ca.enroll({ enrollmentID: userName, enrollmentSecret: secret });
        const enrollment = await ca.enroll({ enrollmentID: userName, enrollmentSecret: secret });

        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(userName.toLowerCase(), x509Identity);
        console.log(`Successfully enrolled client user ${userName} and imported it into the wallet`);
        response = { success: true, message: `Successfully enrolled client user ${userName} and imported it into the wallet` };

    } catch (error) {
        response = { success: false, message: error.message };
        console.error(`Failed to enroll client user "${userName}": ${error}`);
    }

    return response;
}
module.exports = enrollUser;

