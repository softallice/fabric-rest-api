const { Service } = require('feathers-mongoose');
const network = require('../../blockchain/fabricConnection');

exports.Invoke = class Invoke extends Service {
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

        const contract = await network.connect(user, channel, chaincode, org);

        console.log('...arg : ', ...arg)

        try {
            const result = await contract.contract.submitTransaction(fcn, ...arg);
            console.log(`Transaction has been evaluated, invoke result is: ${result.toString()}`);
            response = 'success';
            contract.gateway.disconnect();
        } catch (err) {
            console.log(err);
            response = err;
            contract.gateway.disconnect();
        }

        return {
            response
        };
    }
};
