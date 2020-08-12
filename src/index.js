import './index.css';
import * as serviceWorker from './serviceWorker';
import { rerenderEntireTree } from './render'
import { state, actions } from './state'

rerenderEntireTree({state, actions})
serviceWorker.unregister();
