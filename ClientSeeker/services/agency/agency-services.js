import { getAxios } from '../../lib/axios';

let url = '/agency';
let AgencyServices = {
    getAgencyById: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAllAgency: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAgencyProviders: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}/providers`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAgencyServiceTypes: async(agencyID) => {
        try {
            let queryUrl = `${url}/${agencyID}/service-types`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    searchProviderInAgency: async(agencyID, search) => {
        try {
            let queryUrl = `${url}/${agencyID}/search-name?searchQuery=${search}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = AgencyServices;