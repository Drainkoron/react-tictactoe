import React from 'react';
import { GameContainer } from './components/GameContainer';
import './App.css';

function App() {
  let size = {w:3, h:3} 

  return (
    <div className="App">
      <div className="App-mainContent">
        <GameContainer size={size}/>
      </div>
    </div>
  );
}

export default App;
