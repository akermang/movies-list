import React, { Component } from 'react';
import './App.css';
import ListComponent from './componets/List.component.jsx';
import HeaderComponent from './componets/Header.component.jsx';

class App extends Component {

  render() {
    return (
      <div className="App">
       <HeaderComponent/>
       <ListComponent/>
      </div>
    );
  }
}

export default App;
