const { Service } = require('feathers-mongoose');
const network = require('../../blockchain/fabricConnection');

exports.Query = class Query extends Service {
    async create(data, params ) {
        let response;       

        // params
        const channelName = params.query.channelName;
        const chaincodeName = params.query.chaincodeName;
        const org = params.query.org;
        const user = params.query.user;
        //datas
        const fcn = data.fcn;
        const arg = data.args;

        console.log('fcn : ' , fcn)
        console.log('args : ' , arg)

        const contract = await network.connect(user, channelName, chaincodeName, org);
        try {
            const result = await contract.evaluateTransaction(fcn, arg);
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            response = result.toString();            
        } catch (err) {
            response = err
        }

        return {
            response
        };
    }
};
