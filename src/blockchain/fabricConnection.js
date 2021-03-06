'use strict';
// hyperledger fabric network connection
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function connect( user, channel, chaincode, userOrg ) {
    try {
        
        const orgDomain = `${userOrg}.example.com`;
        const connectionFile = `connection-${userOrg}.json`;
        
        // load the network configuration
        // const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccpPath = '/opt/gopath/src/trust-id/fabric-samples/test-network/organizations/peerOrganizations/'+ orgDomain +'/' + connectionFile;   
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        // const walletPath = path.join(process.cwd(), 'wallet');
        const walletPath = path.join(__dirname, `./identity/wallet`);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(user);
        if (!identity) {
            console.log(`An identity for the user ${user}  does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user.toLowerCase(), discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        // Get the contract from the network.
        const contract = network.getContract(chaincode);

        return { contract, gateway };

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
    }
}

module.exports.connect = connect;