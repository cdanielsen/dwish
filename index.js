const express = require('express')
const rp = require('request-promise')
const pg = require('pg');
require('dotenv').config()
const {SLACK_HOOK} = require('./config')
const { scheduleAlert, getData, postData } = require('./events')
const { MONGO_API_KEY } = process.env;

const app = express()
const PORT = process.env.PORT || 3001

// Serve static assets at some point
// app.use(express.static('path_to_assets_folder'))

// Top level route

app.get('/', (request, response) => {
  response.send('React Placeholder')
})

app.get('/api/events', async (request, response) => {
  try {
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
  } catch (err) {
    console.error(err);
    response.send("Message failed.");
  }  

  try {
    postData(MONGO_API_KEY, 'DISHWASHER_STARTED');
  } catch (err) {
    console.error(err);
  }

})

// Server listener
app.listen(PORT, (err) => {
  if (err) {
    return console.log('Something bad happened', err)
  }
  console.log(`Huzzah! Server is listening at http://localhost:${PORT}`)
})
