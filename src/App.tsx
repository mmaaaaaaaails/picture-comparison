import React from 'react';
import './App.css';
import left from './left.jpg';
import right from './right.jpg'
import Split from './components/split/Split'

const App = () => {
  return (
    <div className="App">
      <Split left={left} right={right}/>
    </div>
  );
}

export default App;
