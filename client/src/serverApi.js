import * as rp from 'request-promise'

export function getEvents () {
  return rp({
    uri: `http://localhost:5001/api/events`,
    method: 'GET',
    json: true
  })
}

export function updateEvent (id) {
  return rp({
    uri: `http://localhost:5001/api/event/${id}`,
    method: 'POST',
    json: true,
    body: {
      claimed: true
    }
  })
}
