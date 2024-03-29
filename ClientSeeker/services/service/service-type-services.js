import { getAxios } from '../../lib/axios';

let url = '/service-type';

let ServiceTypeServices = {
    getServiceTypes: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

}

module.exports = ServiceTypeServices;