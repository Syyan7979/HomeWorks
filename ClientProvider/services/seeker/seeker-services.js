import { getAxios } from '../../lib/axios';

let url = '/seeker';

let ProviderServices = {
    getSeekers: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getSeeker: async(seekerID) => {
        try {
            let queryURL = `${url}/${seekerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProviderServices;