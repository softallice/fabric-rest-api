const sdk = require("./blockchain/trustid-sdk/dist/index")
const fs = require("fs")
const wal = sdk.Wallet.Instance
const ks = new sdk.FileKeystore("file", "./blockchain/keystore")

wal.setKeystore(ks)
// const ccp = JSON.parse(fs.readFileSync("./blokchain/connection-profile.json", 'utf8'))
const ccp = JSON.parse(fs.readFileSync("/opt/gopath/src/github.com/fabric-rest-api/src/blockchain/connection-profile.json", 'utf8'))

const config = {
    stateStore: '/opt/gopath/src/github.com/trust-id/fabric-samples/test-network/scripts/wallet',
    caName: 'ca-org1',
    caAdmin: 'admin',
    caPassword: 'adminpw',
    tlsOptions: {
        trustedRoots: "-----BEGIN CERTIFICATE-----\nMIICJzCCAc2gAwIBAgIULqtbzmmnzQFhWYTPLmG5gMaH59owCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwNjA4MDUxMzAwWhcNMzYwNjA0MDUxMzAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABDpu\ncbM7btnml5pMuvTtm42L6yVjbWpfiM6f7jzd1VOF9BokoRcLZyStXYO9uyKs/Ud7\ndpj6Lr/JasPuqjbb2+ejRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBTvBkj+aWN4UwOpwA50FN/pmivoyTAKBggqhkjOPQQD\nAgNIADBFAiEAwaKmiJK6dNj5x49/4MN38nfS1pyTzqXOtPATYoilQ7cCIBS4jfov\n3Eo1GrlyWtpjO/dGHmXPlYnuli7Md8WORWUU\n-----END CERTIFICATE-----\n",
        verify: false
    },
    mspId: 'org1MSP',
    caURL: "https://localhost:7054",
    mspId: 'Org1MSP',
    walletID: 'admin',
    asLocalhost: true,
    ccp: ccp,
    chaincodeName: "trustid",
    fcn: "proxy",
    channel: "mychannel"
}

module.exports = function (app) {
    var trustID = new sdk.TrustIdHf(config);
    wal.addNetwork("hf", trustID);
    wal.networks["hf"].configureDriver()
}
// module.exports = async function init() {
//     const app = this;
//     var trustID = new sdk.TrustIdHf(config);
//     wal.addNetwork("hf", trustID);
//     await wal.networks["hf"].configureDriver()
// }