import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Blackjack from "./Blackjack";
import Button from './';
import Create from './Create';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/blackjack" element={<Blackjack />}></Route>
          <Route path="/" element={<Homepage />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
