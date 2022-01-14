import { Ingredient } from "../models/Ingredient";

const updateIngredientOrder = (ingredients : Ingredient[], sourceIndex : number, destinationIndex: number) =>{
  let startIndex = sourceIndex < destinationIndex ? sourceIndex : destinationIndex;
  const endIndex = sourceIndex === startIndex ? destinationIndex : sourceIndex;
  while(startIndex < endIndex){
  let temp = ingredients[startIndex+1].view_order;
  ingredients[startIndex+1].view_order = ingredients[startIndex].view_order;
  ingredients[startIndex].view_order = temp;
  startIndex++;
  if(sourceIndex<destinationIndex){
  ingredients = ingredients.sort((A,B)=>A.view_order-B.view_order);
  }
  }
  return ingredients;
}
export default updateIngredientOrder;
