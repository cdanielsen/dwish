const rp = require('request-promise')
const moment = require('moment')
const {SLACK_HOOK} = require('./config')

function scheduleAlert ({time = 9000000, msg = "Something happened!"}) {
  return setTimeout(() => {
    return rp({
      uri: SLACK_HOOK,
      method: 'POST',
      body: {
        'text': msg
      },
      json: true
    })
  }, time)
}

function getData (apiKey) {
  return rp({
    method: 'GET',
    uri: `https://api.mlab.com/api/1/databases/dwishdb/collections/DishEvents?apiKey=${apiKey}`,
    json: true
  });
}

function getDataById (apiKey, id) {
  return rp({
    method: 'GET',
    uri: `https://api.mlab.com/api/1/databases/dwishdb/collections/DishEvents/${id}?apiKey=${apiKey}`,
    json: true
  });
}

function postData (apiKey, eventType) {
  return rp({
    method: 'POST',
    uri: `https://api.mlab.com/api/1/databases/dwishdb/collections/DishEvents?apiKey=${apiKey}`,
    body: {
      timeCreated: moment().format(),
      timeClaimed: '',
      claimed: false,
      eventType
    },
    json: true
  });
}

function putData(apiKey, dishEvent) {
  const id = dishEvent._id.$oid;

  return rp({
    method: 'PUT',
    uri: `https://api.mlab.com/api/1/databases/dwishdb/collections/DishEvents/${id}?apiKey=${apiKey}`,
    body: {
      ...dishEvent,
      timeClaimed: moment().format(),
      claimed: true
    },
    json: true
  });
}
module.exports = { scheduleAlert, getData, postData, putData, getDataById }
