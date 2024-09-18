import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import DroneSimulator from "./DroneSimulator.jsx";
import GameMode from "../src/pages/GameMode.jsx";

import "./css/index.css";

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