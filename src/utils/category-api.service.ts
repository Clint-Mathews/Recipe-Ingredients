import { Category } from "../models/Category";
import getAPIURL from "./create.url";


export const getCategories = async() => {
        const response = await fetch(getAPIURL('getCategory'));
        const data = await response.json();
        return data;
}
export const addCategory = async(newCategory:string) => {
        const response = await fetch(getAPIURL('addCategory'), {
            body: JSON.stringify({ data: newCategory }),
            method: "POST"
        });
        const data = await response.json();
        return data;
}
export const updateCategory = async(item: Category, categoryNameUpdate:string) => {
        const response = await fetch(getAPIURL('updateCategory'), {
            body: JSON.stringify({ value: item.value, category_name: categoryNameUpdate }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}
export const deleteCategory = async(category:string) => {
        const response = await fetch(getAPIURL('deleteCategory'), {
                body: JSON.stringify({ data: category }),
                method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}
export const getRecipesBasedOnCategory = async(category:string) => {
        const response = await fetch(getAPIURL('getRecipesBasedOnCategory'), {
            body: JSON.stringify({ data: category }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}
const categoryApiService = { getCategories, addCategory, updateCategory, getRecipesBasedOnCategory, deleteCategory}
export default categoryApiService;