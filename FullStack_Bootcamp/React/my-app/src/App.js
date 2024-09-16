import logo from './logo.svg';
import './App.css';
import React from 'react';
import StarWars from './Myitem';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StarWars/>
      </header>





      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Item name="John"/>
        <Item2 name="Tim"/>
        <Item2 name="Sudan"/>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
