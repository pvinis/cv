import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Pavlos Vinieratos CV
          </p>
          <a
            className="App-link"
            href="https://raw.githubusercontent.com/pvinis/cv/master/Pavlos-Vinieratos-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
        </header>
      </div>
    );
  }
}

export default App;
