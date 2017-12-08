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
            return !dishEvent.claimed ? <div className="event" key={idx}><button className="button is-info is-large is-focused" onClick={() => this.claimEventHandler(dishEvent)}>Unload!</button></div> : null
          })
        }
      </div>)
    } else {
      display = (<div className="no-tasks"><img src="dishwasher.png" /><h4>(Load the left diswasher!)</h4></div>)
    }

    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <h2>tasks</h2>
            {display}
          </div>
          <div className="column">
            <h2>leaders</h2>
              <div className="dish-washer">
                <img src="josh.png" className="image is-96x96" />
                <h4>Josh Jarmain</h4>
                <h4><strong>50 pts</strong></h4>
              </div>

              <div className="dish-washer">
                <img src="slick.png" className="image is-96x96" />
                <h4>David Slick</h4>
                <h4><strong>25 pts</strong></h4>
              </div>

              <div className="dish-washer">
                <img src="katelyn.png" className="image is-96x96" />
                <h4>Katelynn W</h4>
                <h4><strong>0 pts</strong></h4>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskList;
