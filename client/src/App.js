import React, { Component } from 'react';
import TaskList from './Components/TaskList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DWISH</h1>
        </header>

        <TaskList />
      </div>
    );
  }
}

export default App;
