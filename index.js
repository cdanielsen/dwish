const express = require('express')
const rp = require('request-promise')
const pg = require('pg');
const {SLACK_HOOK} = require('./config')
const {scheduleAlert} = require('./events')

const app = express()
const PORT = process.env.PORT || 3001

// Serve static assets at some point
// app.use(express.static('path_to_assets_folder'))

// Top level route
app.get('/', async (request, response) => {
  const slackResponse = await rp({
    uri: SLACK_HOOK,
    method: 'POST',
    body: {
      'text': 'Dishwasher was started!'
    },
    json: true
  });

  scheduleAlert({
    time: 5000
  })

  response.send("Message sent!");
})

// Server listener
app.listen(PORT, (err) => {
  if (err) {
    return console.log('Something bad happened', err)
  }
  console.log(`Huzzah! Server is listening at http://localhost:${PORT}`)
})
