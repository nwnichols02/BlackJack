import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Blackjack from "./Blackjack";
import Hangman from './Hangman';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/hangman' element={<Hangman/>}></Route>
          <Route path="/blackjack" element={<Blackjack />}></Route>
          <Route path="/" element={<Homepage />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
