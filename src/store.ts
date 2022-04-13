import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import categoryReducer from './utils/categorySlice'
import recipeReducer from './utils/recipeSlice'
import ingredientReducer from './utils/ingredientSlice'
import authReducer from './utils/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer: {
    category: categoryReducer,
    recipes: recipeReducer,
    ingredients: ingredientReducer,
    auth: persistedReducer
  }
});

const Peristor = persistStore(store);
export{Peristor};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;