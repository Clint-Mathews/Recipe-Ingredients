import { Ingredient } from "../models/Ingredient";
import { Recipe } from "../models/Recipe";
import getAPIURL from "./create.url";

export const getIngredientsBasedOnRecipe = async(recipe:string) => {
        const response = await fetch(getAPIURL('getIngredientsBasedOnRecipe'), {
            body: JSON.stringify({ data: recipe }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}

export const updateIngredient = async(ingredient:Ingredient) => {
        const response = await fetch(getAPIURL('updateIngredient'), {
            body: JSON.stringify({ data: ingredient }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}

export const addIngredient = async(ingredient:Ingredient) => {
        const response = await fetch(getAPIURL('addIngredient'), {
            body: JSON.stringify({ data: ingredient }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}

export const deleteIngredientFromList = async(ingredient:Ingredient) => {
        const response = await fetch(getAPIURL('deleteIngredient'), {
            body: JSON.stringify({ data: ingredient }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}

const ingredientApiService = { getIngredientsBasedOnRecipe, addIngredient, updateIngredient, deleteIngredientFromList}
export default ingredientApiService;