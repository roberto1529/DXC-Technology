import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:name" element={<PokemonDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
