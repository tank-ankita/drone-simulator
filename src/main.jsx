import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import DroneSimulator from "./pages/playground/DroneSimulator.jsx";
import {GameMode} from "./pages/game-mode/GameMode.jsx";
import HomePage from './pages/dashboard/Homepage.jsx';
import Test from './pages/testt/Test.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/space" element={<DroneSimulator />} />
        <Route path="/city" element={<DroneSimulator />} />
        <Route path="/mountains" element={<DroneSimulator />} />
        <Route path="/game-mode" element={<GameMode />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);