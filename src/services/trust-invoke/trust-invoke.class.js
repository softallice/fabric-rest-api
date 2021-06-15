const { Service } = require('feathers-mongoose');
const network = require('../../blockchain/trustConnection');

exports.TrustInvoke = class TrustInvoke extends Service {
    async create(data, params ) {
        let response;

        console.log('----------trust--------------------')
        
        const channel = data.contract.channel;
        const chaincode = data.contract.chaincode;
        const org = data.contract.org;
        const user = data.contract.user;

        const did = data.did;
        const didPass = data.didPass;
        const serviceDID = data.serviceDID;
        // const serviceChaincode = data.serviceChaincode;
        // const accessPolicy = data.accessPolicy;

        const fcn = data.fcn;
        const arg = data.args;

        const contract = await network.connect(user, channel, chaincode, org);
        
        const keydid = await contract.getDID(did)
        await keydid.unlockAccount(didPass)

        // try {
        //     let res = await contract.networks.hf.getService(keydid, serviceDID)
        //     console.log("[*] Service info:\n", res)
        // } catch (err) {
        //     console.log('error : ', err)
        // }
        //invoke
        try {
            await contract.networks.hf.invoke(keydid, serviceDID ,[fcn, ...arg], chaincode)
            response = 'sucess'
        } catch(err) {
            console.log('error : ', err)
        }
        
        return {
            response
        };
    }
};
