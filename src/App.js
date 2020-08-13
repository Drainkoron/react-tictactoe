import React from 'react';
import { GameContainer } from './components/GameContainer';
import { GameSettings } from './components/GameSettings';
import './App.css';

function App(props) {
  
  const GameFunc = () =>{
    //if(props.state.GameSettings.buttonValue !== 'play')
      return <GameContainer state={props.state.GameContainer} actions={props.actions.GameContainer}/>
    return null
  }

  return (
    <div className="App">
      <div className="App-mainContent">
        <div>
          <GameSettings state={props.state.GameSettings} actions={props.actions.GameSettings}/>
        </div>
        
          {<GameFunc/>}
      </div>
    </div>
  );
}

export default App;
