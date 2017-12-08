import React, { Component } from 'react';
import {getEvents, updateEvent} from '../serverApi'

class TaskList extends Component {
  state = {
    events: []
  }

  componentDidMount () {
    getEvents().then(result => {
      this.setState({
        events: result
      })
    })
  }
  unclaimedEventsExist () {
    const output = this.state.events.some(event => event.claimed === false);
    return output    
  }

  claimEventHandler (dishEvent) {
    updateEvent(dishEvent._id.$oid)
      .then(msg => {
      return getEvents()
    }).then(result => {
      this.setState({
        events: result
      })
    })
  }

  render() {
    let display;

    if(this.unclaimedEventsExist()) {
      display = (<div>
        {
          this.state.events.map((dishEvent, idx) => {
            return !dishEvent.claimed ? <div key={idx}><span>{dishEvent.eventType}</span><button onClick={() => this.claimEventHandler(dishEvent)}>CLAIM IT!</button></div> : null
          })
        }
      </div>)
    } else {
      display = (<h1>NOTHING TO DO</h1>)
    }

    return (
      <div>
        {display}
      </div>
    );
  }
}

export default TaskList;
