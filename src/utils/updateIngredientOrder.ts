import { Ingredient } from "../models/Ingredient";

const updateIngredientOrder = (ingredients : Ingredient[], sourceIndex : number, destinationIndex: number) =>{

        //   ingredients.forEach((data: Ingredient) => {
        //     data.view_order = data.id - 1;
        // });
  if(sourceIndex < destinationIndex){
  while(sourceIndex < destinationIndex){
  const temp = ingredients[sourceIndex+1].view_order;
  ingredients[sourceIndex+1].view_order = ingredients[sourceIndex].view_order;
  ingredients[sourceIndex].view_order = temp;
  sourceIndex++;
  ingredients = ingredients.sort((A,B)=>A.view_order-B.view_order);
  }
} else {
  while(sourceIndex > destinationIndex){
  const temp = ingredients[sourceIndex-1].view_order;
  ingredients[sourceIndex-1].view_order = ingredients[sourceIndex].view_order;
  ingredients[sourceIndex].view_order = temp;
  sourceIndex--;
  ingredients = ingredients.sort((A,B)=>A.view_order-B.view_order);
  }
}
  return ingredients;
}
export default updateIngredientOrder;
