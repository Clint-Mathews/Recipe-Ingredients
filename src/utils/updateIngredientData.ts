import { Ingredient } from "../models/Ingredient";

const updateIngredientData = (ingredients : Ingredient[], ingredient : Ingredient) =>{
  const objIndex = ingredients.findIndex(((obj:Ingredient) => obj.id === ingredient.id));
  ingredients[objIndex].description = ingredient.description;
  ingredients[objIndex].title = ingredient.title;
  ingredients[objIndex].view_order = ingredient.view_order;
  ingredients[objIndex].thumbnail = ingredient.thumbnail;
  return ingredients;
}
export default updateIngredientData;
