import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ingredient } from '../models/Ingredient'
import type { RootState } from '../store'
import updateIngredientData from './updateIngredientData'

interface IngredientState {
  ingredients: Ingredient[]
}
// Define the initial state using that type
const initialState : IngredientState = {
    ingredients: []
}

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
     state.ingredients = action.payload.sort((A,B)=>A.view_order - B.view_order);
    },
    updateIngredient: (state, action: PayloadAction<Ingredient>) => {
     state.ingredients = updateIngredientData(state.ingredients, action.payload);
    },
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
     state.ingredients = [...state.ingredients, action.payload];
    },
    deleteIngredient: (state, action:  PayloadAction<Number>) => {
      state.ingredients = state.ingredients.filter((item: Ingredient) => item.id !== action.payload); 
    },
  },
})

export const { setIngredients, updateIngredient , addIngredient, deleteIngredient } = ingredientSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const ingredients = (state: RootState) => state.ingredients.ingredients

export default ingredientSlice.reducer