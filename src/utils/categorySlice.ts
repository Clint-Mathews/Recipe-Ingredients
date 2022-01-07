import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../models/Category'
import type { RootState } from '../store'
import updateCategoires from './updateCatergory'

// Define a type for the slice state
interface CategoryState {
  category: Category[]
}
// Define the initial state using that type
const initialState : CategoryState = {
    category: []
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
     state.category = action.payload;
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
     state.category = updateCategoires(state.category, action.payload);
    },
    addCategory: (state, action: PayloadAction<Category>) => {
     state.category = [...state.category, action.payload];
    },
    deleteCategory: (state, action:  PayloadAction<String>) => {
      state.category = state.category.filter((item: Category) => item.value !== action.payload); 
    },
  },
})

export const { updateCategory, deleteCategory , addCategory, setCategories } = categorySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const category = (state: RootState) => state.category.category

export default categorySlice.reducer