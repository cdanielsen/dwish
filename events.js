const rp = require('request-promise')
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

module.exports = { scheduleAlert }
