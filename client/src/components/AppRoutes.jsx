import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';

// Example of how Routes are defined in React Router v6+
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
