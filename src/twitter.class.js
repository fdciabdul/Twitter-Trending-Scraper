const axios = require('axios');
require('dotenv').config();
console.log(process.env.TWITTER_BEARER_TOKEN);
const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
}
/**
 * Twitter Trending 
 * @author Abdul Muttaqin
 * @date 2022-06-27
 * @returns {any}
 */
const worldwideTrends = async (req, res) => {
    try {
        let response = await axios.get(`https://api.twitter.com/1.1/trends/place.json?id=1`, config);
        let trends = response.data[0].trends;
        return trends;
    } catch (error) {
        return error;
    }
}
/**
 * Twitter Trending 
 * @author Abdul Muttaqin
 * @date 2022-06-27
 * @returns {any}
 */
const trendByid = async (id) => {
    try {
   
        let trendResponse = await axios.get(`https://api.twitter.com/1.1/trends/place.json?id=${id}`, config);
        let trends = trendResponse.data[0].trends;
        return trends;
    } catch (error) {
        return error
    }
}
/**
 * Twitter Trending 
 * @author Abdul Muttaqin
 * @date 2022-06-27
 * @returns {any}
 */
const getTrendsAvailable = async (req, res) => {
    try {
        let response = await axios.get(`https://api.twitter.com/1.1/trends/available.json`, config);
        let trends = response.data;
        return trends;
    } catch (error) {
        return error;
    }
}

module.exports = {
    worldwideTrends,
    getTrendsAvailable,
    trendByid
}
