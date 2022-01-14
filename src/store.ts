import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './utils/categorySlice'
import recipeReducer from './utils/recipeSlice'
import ingredientReducer from './utils/ingredientSlice'

const store = configureStore({
  reducer: {
    category: categoryReducer,
    recipes: recipeReducer,
    ingredients: ingredientReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;