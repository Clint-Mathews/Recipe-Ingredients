import { Recipe } from "../models/Recipe";

const updateRecipeData = (recipes : Recipe[], recipe : Recipe) =>{
  const objIndex = recipes.findIndex(((obj:Recipe) => obj.title === recipe.title));
  recipes[objIndex].category = recipe.category;
  recipes[objIndex].description = recipe.description;
  recipes[objIndex].recipe_name = recipe.recipe_name;
  recipes[objIndex].thumbnail = recipe.thumbnail;
  return recipes;
}
export default updateRecipeData;
