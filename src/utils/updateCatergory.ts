import { Category } from "../models/Category";

const updateCategoires = (categories : Category[], newData : Category) =>{
  const objIndex = categories.findIndex(((obj:Category) => obj.value === newData.value));
  categories[objIndex].category_name = newData.category_name;
  return categories
}
export default updateCategoires;
