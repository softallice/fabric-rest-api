const { Service } = require('feathers-mongoose');
const enrollUser = require('../../blockchain/registerUser');

exports.Enroll = class Enroll extends Service {
    constructor(options, app) {
        super(options);
    }

    async find(params) {
        return [{
            id: 1,
            text: 'Message 1'
          }, {
            id: 2,
            text: 'Message 2'
          }];
    }

    async get(id, params) {
        return {
          id,
          text: `You have to do ${id}!`
        };
    }

 
  async create(data, params) {
    let response = await enrollUser(data.user, data.userPwd, data.org);
    console.log(response)
    return response;
  }
    
};
