const rp = require('request-promise');
require('dotenv').config();

const {MONGO_API_KEY} = process.env;

const getDatabase = () => {
  return rp({
    method: 'GET',
    uri: `https://api.mlab.com/api/1/databases/dwishdb/collections/DishEvents?apiKey=${MONGO_API_KEY}`,
    json: true
  });
};

getDatabase().then(res => {
  console.log(res)  
});
