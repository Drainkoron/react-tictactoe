import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rerenderEntireTree = (props) => {
    ReactDOM.render(
      <React.StrictMode>
        <App state={props.state} actions={props.actions}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
}

export { rerenderEntireTree }