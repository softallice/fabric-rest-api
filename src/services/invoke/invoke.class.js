const { Service } = require('feathers-mongoose');
const network = require('../../blockchain/fabricConnection');

exports.Invoke = class Invoke extends Service {
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

        const contract = await network.connect(user, channelName, chaincodeName, org);

        console.log('contract : ', contract)
        try {
            const result = await contract.evaluateTransaction(fcn, ...arg);
            response = 'success';  
        } catch (err) {
            console.log(err)
            response = err
        }

        return {
            response
        };
    }
};
