const express = require('express')
const rp = require('request-promise')
const pg = require('pg');
const {join} = require('path')
require('dotenv').config()
const {SLACK_HOOK} = require('./config')
const { scheduleAlert, getData, getDataById, postData, putData } = require('./events')
const { MONGO_API_KEY } = process.env;

const app = express()
const PORT = process.env.PORT || 5001

// Serve static assets at some point
// app.use(express.static('path_to_assets_folder'))

// Top level route
const assets = join(__dirname, 'client/build')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static files from ./build
app.use(express.static(assets))

app.get('/', (request, response) => {
  response.sendFile(join(__dirname, '/index.html'))

})

app.get('/api/events', async (request, response) => {
  try {
    const events = await getData(MONGO_API_KEY);
    response.send(events);
  } catch (err) {
    console.error(err);
  }
})

app.post('/api/event', async (request, response) => {
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
      msg: 'A dishwasher is ready to be emptied.',
      time: 15000
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

app.post('/api/event/:id', async function (req, res) {
  const eventDetails = await getDataById(MONGO_API_KEY, req.params.id);

  try {
    await putData(MONGO_API_KEY, eventDetails);
    await rp({
      uri: SLACK_HOOK,
      method: 'POST',
      body: {
        'text': 'Thanks for emptying the dishwasher!'
      },
      json: true
    });

    res.send('Put request to the db and the slack succeeded')

  } catch (err) {
    console.error(err);
    res.send('Patch request to the db went terribly wrong')
  }
})
// Server listener
app.listen(PORT, (err) => {
  if (err) {
    return console.log('Something bad happened', err)
  }
  console.log(`Huzzah! Express Server is listening at http://localhost:${PORT}`)
})
