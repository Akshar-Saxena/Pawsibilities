import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AllPetsPage from "./pages/AllPetsPage";
import UploadPage from "./pages/UploadPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/signup" element={<SignUpPage />} />
                <Route exact path="/pets" element={<AllPetsPage />} />
                <Route exact path="/upload" element={<UploadPage />} />
            </Routes>
        </Router>
    );
}
