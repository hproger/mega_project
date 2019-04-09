import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MobxReactDevtools from 'mobx-react-devtools';
import {Provider} from 'mobx-react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {stores} from './stores';

ReactDOM.render(<Provider {...stores}><DragDropContextProvider backend={HTML5Backend}><App /><MobxReactDevtools /></DragDropContextProvider></Provider>, document.getElementById('root'));