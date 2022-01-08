import { Category } from "../models/Category";

const checkDataExists = (categories : Category[], category : string) =>{
  const data = categories.filter(((obj:Category) => obj.category_name === category));
  return data.length === 0;
}
export default checkDataExists;
