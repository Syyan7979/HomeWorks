import { getAxios } from '../../lib/axios';

let url = '/review';

let ReviewServices = {
    getAllReviews: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getServiceReviews: async(serviceID, page, size) => {
        try {
            let queryURL = `${url}/service/${serviceID}/?offsetMultiplier=${page}&sizeLimit=${size}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getReview: async(reviewID) => {
        try {
            let queryURL = `${url}/${reviewID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ReviewServices;