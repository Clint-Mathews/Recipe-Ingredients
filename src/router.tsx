import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import CategoryPage from './components/CategoryPage';
import IngredientsPage from './components/IngredientsPage';
import MainIngredients from './components/MainIngredients';
import MainPage from './components/MainPage';
import MainRecipePage from './components/MainRecipePage';
import RecipePage from './components/RecipePage';
import { useAppSelector } from './hooks';
function AppRouter() {
    const isLoggedIn: any = useAppSelector((state) => state.auth.isLoggedIn);
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<MainPage />} />
                {isLoggedIn && <Route path="/category" element={<CategoryPage />} />}
                {isLoggedIn && <Route path="/recipe" element={<RecipePage />} />}
                {isLoggedIn && <Route path="/ingredient" element={<IngredientsPage />} />}
                <Route path="/recipes" element={<MainRecipePage />} />
                <Route path="/ingredients" element={<MainIngredients />} />
                <Route path="*" element={<Navigate to="/recipes" />} />
            </Routes>
        </Router >
    )
}

export default AppRouter;
