'use strict';
// hyperledger fabric network connection with trustid
const sdk = require("./trustid-sdk/dist/index.js")
const path = require('path');
const fs = require('fs');


async function connect(user, channel, chaincode, userOrg ) {
    try {
        const wal = sdk.Wallet.Instance
        const ms = new sdk.MongoKeystore("mongodb://0.0.0.0:27017/api","did")

        // mongo connect
        ms.init()
        //-------------

        wal.setKeystore(ms)

        const orgDomain = `${userOrg}.example.com`;
        const connectionFile = `connection-${userOrg}.json`;        
        
        // load the network configuration
        const ccpPath = path.resolve(__dirname, 'connection-profile.json');
        // const ccpPath = '/opt/gopath/src/trust-id/fabric-samples/test-network/organizations/peerOrganizations/'+ orgDomain +'/' + connectionFile;   
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        // const ccp = JSON.parse(fs.readFileSync("./connection-profile.json", 'utf8'))        
        
        const config = {
            stateStore: './identity/wallet',
            caName: 'ca-org1',
            caAdmin: 'admin',
            caPassword: 'adminpw',
            tlsOptions: {
                trustedRoots: "-----BEGIN CERTIFICATE-----\nMIICJzCCAc2gAwIBAgIUR7b81P021DngYLe1BkTzcEd8TjAwCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwNjE0MDcwNjAwWhcNMzYwNjEwMDcwNjAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABBxd\nVPmlklPsAsw8phxCaE1d4xFX1dprSvOp9tQnULxbCqmWsemoFgfCTokoNm7WAkOZ\nQbtvomOMIc8O15649dSjRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBS5XsbQEFlos/WDJfPrIvaRJfZWbDAKBggqhkjOPQQD\nAgNIADBFAiEA2iKTOweBv4J9X67BimYsUNHF6onn/Fp5tg9Puhlbbx0CIAUAxOG6\n+T9d+8cdBppXDtdQM7zPhbQycgBmYoHYTOR/\n-----END CERTIFICATE-----\n",
                verify: false
            },
            mspId: 'org1MSP',
            caURL: "https://localhost:7054",
            mspId: 'Org1MSP',
            walletID: user,
            asLocalhost: true,
            ccp: ccp,
            chaincodeName: chaincode,
            fcn: "proxy",
            channel: channel
        }


        var trustID = new sdk.TrustIdHf(config);

        wal.addNetwork("hf", trustID);

        await wal.networks["hf"].configureDriver()

        return wal

    } catch (error) {
        console.error(`Failed to trust transaction: ${error}`);
    }
}

module.exports.connect = connect;