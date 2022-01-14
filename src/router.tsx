import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import CategoryPage from './components/CategoryPage';
import IngredientsPage from './components/IngredientsPage';
import MainPage from './components/MainPage';
import RecipePage from './components/RecipePage';
function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/recipe" element={<RecipePage />} />
                <Route path="/ingredient" element={<IngredientsPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router >
    )
}

export default AppRouter;
