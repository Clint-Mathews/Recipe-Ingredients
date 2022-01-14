import { Ingredient } from "../models/Ingredient";

const getNewViewOrderIngredient = (ingredients : Ingredient[]) =>{
  const currentLastIndex = ingredients.length>0 ? Math.max(...ingredients.map(((obj:Ingredient) => obj.id))) : 0;
  return currentLastIndex +1;
}
export default getNewViewOrderIngredient;
