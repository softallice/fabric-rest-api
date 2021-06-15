const { Service } = require('feathers-mongoose');
const network = require('../../blockchain/fabricConnection');

exports.Query = class Query extends Service {
    async create(data, params ) {
        let response;       

        // params
        // const channelName = params.query.channelName;
        // const chaincodeName = params.query.chaincodeName;
        // const org = params.query.org;
        // const user = params.query.user;
        //datas
        const fcn = data.fcn;
        const arg = data.args;

        const channel = data.contract.channel;
        const chaincode = data.contract.chaincode;
        const org = data.contract.org;
        const user = data.contract.user;

        console.log('fcn : ' , fcn)
        console.log('args : ' , arg)

        const contract = await network.connect(user, channel, chaincode, org);
        try {
            const result = await contract.contract.evaluateTransaction(fcn, arg);
            console.log(`Transaction has been evaluated, query result is: ${result.toString()}`);
            response = result.toString();      
            
            contract.gateway.disconnect();
        } catch (err) {
            response = err;
            contract.gateway.disconnect();
        }

        return {
            response
        };
    }
};
