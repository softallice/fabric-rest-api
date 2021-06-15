const { Service } = require('feathers-mongoose');
const network = require('../../blockchain/trustConnection');

exports.Sign = class Sign extends Service {
    async create(data, params ) {
        let response;

        console.log('----------serviceInfo--------------------')
        
        const channel = data.contract.channel;
        const chaincode = data.contract.chaincode;
        const org = data.contract.org;
        const user = data.contract.user;

        const did = data.did;
        const didPass = data.didPass;

        // sign data
        const payload = data.payload;

        const contract = await network.connect(user, channel, chaincode, org);
        
        
        const keydid = await contract.getDID(did)
        await keydid.unlockAccount(didPass)

        try {
            response = await keydid.sign(payload)
        } catch(err) {
            response= err
        }        
        
        return {
            response
        };
    }
};
