import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import AddDetailsPage from './components/AddDetailsPage';
import MainPage from './components/MainPage';
import RecipePage from './components/RecipePage';
function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/add-details" element={<AddDetailsPage />} />
                <Route path="/recipe" element={<RecipePage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router >
    )
}

export default AppRouter;
