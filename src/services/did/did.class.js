const { Service } = require('feathers-mongoose');
const network = require('../../blockchain/trustConnection');

exports.Did = class Did extends Service {
    async create(data, params ) {
        let response;
        // trust 기본 접근 정보
        const channel = data.contract.channel;
        const chaincode = data.contract.chaincode;
        const org = data.contract.org;
        const user = data.contract.user;
        // 서비스 구성
        const serviceDID = data.serviceDID;
        const serviceChaincode = data.serviceChaincode;
        const accessPolicy = data.accessPolicy;
        // 기본 정보
        const didName = data.didName;
        const didPass = data.didPass;
        
        //네트워크 설정
        const contract = await network.connect(user, channel, chaincode, org);
        //생성
        const did = await contract.generateDID("RSA", didName, didPass)
        // 비밀 
        await did.unlockAccount(didPass)
        // Register in the platform.
        await contract.networks.hf.createSelfIdentity(did)
        contract.setDefault(did)

        // Get the registered identity.
        
        try {
            response = JSON.parse(await contract.networks.hf.getIdentity(did, did.id))
        } catch(err) {
            response = 'did create error : ' + err
        }

        return {
            response
        };
    }
};
