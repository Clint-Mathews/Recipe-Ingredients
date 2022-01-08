import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Recipe } from '../models/Recipe'
import type { RootState } from '../store'

// Define a type for the slice state
interface RecipeState {
  recipes: Recipe[]
}
// Define the initial state using that type
const initialState : RecipeState = {
    recipes: []
}

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
     state.recipes = action.payload;
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
    //  state.recipes = updateCategoires(state.recipes, action.payload);
     state.recipes = [];
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
     state.recipes = [...state.recipes, action.payload];
    },
    deleteRecipe: (state, action:  PayloadAction<String>) => {
      state.recipes = state.recipes.filter((item: Recipe) => item.title !== action.payload); 
    },
  },
})

export const { setRecipes, updateRecipe , addRecipe, deleteRecipe } = recipeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const recipes = (state: RootState) => state.recipes.recipes

export default recipeSlice.reducer