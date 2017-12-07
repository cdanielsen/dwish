import React, { Component } from 'react';
const rp = require('request-promise')

class TaskList extends Component {
  state = {
    events: []
  }

  componentDidMount () {
    console.log('yasss')
    rp({
      uri: `http://localhost:3001/api/events`,
      method: 'GET',
      json: true
    }).then(result => {
      this.setState({
        events: result
      })
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.events.map(event => {
            return <li>{event.timeCreated}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default TaskList;
