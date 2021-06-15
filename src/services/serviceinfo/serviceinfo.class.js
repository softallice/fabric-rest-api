const { Service } = require('feathers-mongoose');
const network = require('../../blockchain/trustConnection');

exports.Serviceinfo = class Serviceinfo extends Service {
    async create(data, params ) {
        let response;

        console.log('----------serviceInfo--------------------')
        
        const channel = data.contract.channel;
        const chaincode = data.contract.chaincode;
        const org = data.contract.org;
        const user = data.contract.user;

        const did = data.did;
        const didPass = data.didPass;
        const serviceDID = data.serviceDID;
        const serviceChaincode = data.serviceChaincode;
        const accessPolicy = data.accessPolicy;

        const contract = await network.connect(user, channel, chaincode, org);
        // console.log('contract', contract)
        
        const keydid = await contract.getDID(did)
        await keydid.unlockAccount(didPass)
        console.log('keydid', keydid)

        try {
            response = await contract.networks.hf.createService(keydid, serviceDID, serviceChaincode , accessPolicy, channel)
        } catch(err) {
            response= err
        }        
        
        return {
            response
        };
    }
};
