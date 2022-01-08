import getAPIURL from "./create.url";

export const getRecipesBasedOnCategory = async(category:string) => {
        const response = await fetch(getAPIURL('getRecipesBasedOnCategory'), {
            body: JSON.stringify({ data: category }),
            method: "POST"
        });
        const responseData = await response.json();
        return responseData;
}
const recipeApiService = { getRecipesBasedOnCategory}
export default recipeApiService;