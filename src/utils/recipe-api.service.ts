import { Recipe } from "../models/Recipe";
import getAPIURL from "./create.url";

export const getRecipesBasedOnCategory = async(category:string) => {
        const response = await fetch(getAPIURL('getRecipesBasedOnCategory'), {
            body: JSON.stringify({ data: category }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}

export const updateRecipe = async(recipe:Recipe) => {
        const response = await fetch(getAPIURL('updateRecipe'), {
            body: JSON.stringify({ data: recipe }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}

export const addRecipe = async(recipe:Recipe) => {
        const response = await fetch(getAPIURL('addRecipe'), {
            body: JSON.stringify({ data: recipe }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}

export const deleteRecipeFromList = async(recipe:Recipe) => {
        const response = await fetch(getAPIURL('deleteRecipe'), {
            body: JSON.stringify({ data: recipe }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}

const recipeApiService = { getRecipesBasedOnCategory, updateRecipe, addRecipe, deleteRecipeFromList}
export default recipeApiService;