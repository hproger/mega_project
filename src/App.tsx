import React, { Component, Props } from 'react';
import './App.css';
import ConstructorArea from './application/constructorArea';
import Element from './application/elements';
import Header1 from './components/Headers/Header1';
import Footer1 from './components/Footers/Footer1';
import Content1 from './components/Contents/Content1';
import Form1 from './components/Contents/Form1';
import Slider1 from './components/Sliders/Slider1';

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
          <ConstructorArea>
            <Header1 />
            <Content1 />
            <Form1 /> 
            <Slider1 />
            <Footer1 />
          </ConstructorArea>
        </div>
      </div>
    );
  }
}

export default App;
