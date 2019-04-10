import React, { Component, Props } from 'react';
import './App.css';
import ConstructorArea from './components/constructorArea';
import Element from './application/elements';
import {observer, inject} from 'mobx-react';
import { IMegaStore } from './stores/megaStore';

@inject("megaStore")
@observer
class App extends Component<{
  megaStore?: IMegaStore;
}> {
  render() {
    const { elements } = this.props.megaStore!;
    return (
      <div className="App page-main container-fluid">
        <div className="elements-list">
          <Element title="Слайдер 1" dataComponent="Sliders" dataName="Slider1" />
          <Element title="Контент 1" dataComponent="Contents" dataName="Content1" />
          <Element title="Форма 1" dataComponent="Contents" dataName="Form1" />
          <Element title="Шапка 1" dataComponent="Headers" dataName="Header1" />
          <Element title="Шапка 2" dataComponent="Headers" dataName="Header2" />
          <Element title="Подвал 1" dataComponent="Footers" dataName="Footer1" />
          <Element title="Подвал 2" dataComponent="Footers" dataName="Footer2" />
          <Element title="Карта 1" dataComponent="Contents" dataName="Map1" />        
        </div>
        <div className="constructor-area">
          <ConstructorArea />
        </div>
      </div>
    );
  }
}

export default App;
