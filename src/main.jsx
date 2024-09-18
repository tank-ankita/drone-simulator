import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import DroneSimulator from "./DroneSimulator.jsx";
import GameMode from "../src/pages/GameMode.jsx";

import "./css/index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Define your routes here */}
          <Route path="/drone-simulator/" element={<DroneSimulator />} />
          <Route path="/drone-simulator/game-mode" element={<GameMode />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
  
