import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import DroneSimulator from "./pages/playground/DroneSimulator.jsx";
import {GameMode} from "./pages/game-mode/GameMode.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<DroneSimulator />} />
        <Route path="/game-mode" element={<GameMode />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);