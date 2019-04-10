import React, { Component, Props } from 'react';
import './App.css';
import ConstructorArea from './components/constructorArea';
import Element from './application/elements';


class App extends Component {
  render() {
    return (
      <div className="App page-main container-fluid">
        <div className="elements-list">
          <Element title="Слайдер 1" dataComponent="Sliders" dataName="Slider1" />
          <Element title="Контент 1" dataComponent="Contents" dataName="Content1" />
          <Element title="Форма 1" dataComponent="Contents" dataName="Form1" />
        </div>
        <div className="constructor-area">
          <ConstructorArea />
        </div>
      </div>
    );
  }
}

export default App;
