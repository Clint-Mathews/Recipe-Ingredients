import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Cards from '../ui-components/Cards'
import Header from '../ui-components/Header'
import SubHeading from '../ui-components/SubHeading'
import SelectCategoryField from '../ui-components/SelectCategoryField'
import { useAppSelector, useAppDispatch } from '../hooks';
import { setCategories } from '../utils/categorySlice'
import categoryApiService from '../utils/category-api.service'
import recipeApiService from '../utils/recipe-api.service'
import { setRecipes } from '../utils/recipeSlice'
import { Category } from '../models/Category'
import { Recipe } from '../models/Recipe'
function RecipePage() {
    const categories: Category[] = useAppSelector((state) => state.category.category);
    const recipes: Recipe[] = useAppSelector((state) => state.recipes.recipes);
    // console.log(recipes);
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState("");
    const fetchCategoryData = async () => {
        const data = await categoryApiService.getCategories();
        dispatch(setCategories(data?.data?.category?.values));
    }

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const fetchRecipeData = async () => {
        const data = await recipeApiService.getRecipesBasedOnCategory(category);
        dispatch(setRecipes(data?.data?.recipes?.values));
    }

    useEffect(() => {
        if (category) {
            fetchRecipeData();
        }

    }, [category])

    const viewRecipesBasedOnCategory = (category: string) => {
        // console.log(category);
        setCategory(category);
    }

    return (
        <Container>
            <Header heading="Recipe" />
            <RecipeContainer>
                <CategoryContainer>
                    <SubHeaingContainer>
                        <SubHeading heading="Recipes" />
                        <SelectCategoryField options={categories} setCategory={viewRecipesBasedOnCategory} />
                    </SubHeaingContainer>
                    {category && recipes.length ? <CardContainer key="CardContainer">
                        {recipes.map((item: Recipe) => {
                            return (
                                < Cards recipe={item} />
                            )
                        })
                        }
                    </CardContainer>
                        :
                        <NoData key="NoData">
                            <ShowMsg key="ShowMsg">{category ? "No Recipes!" : "Please select a category!"}</ShowMsg>
                        </NoData>
                    }
                </CategoryContainer>
            </RecipeContainer>
        </Container>
    )
}

export default RecipePage

const RecipeContainer = styled.div``;

const Container = styled.div``;
const CategoryContainer = styled.div`
background-color: white;
margin: 20px;
border-radius: 10px;
padding: 20px 20px 20px 25px;
box-shadow: 0 0 25px rgb(0 0 0 / 10%);
:hover{
    box-shadow: 0 0 25px rgb(0 0 0 / 15%);
}
`;

const CardContainer = styled.div`
display:grid;
grid-template-columns: repeat(3, 33.33%);
margin-top: 10px;
    border-top: 2px solid whitesmoke;
`;

const SubHeaingContainer = styled.div`
display:flex;
    justify-content: space-between;
        align-items: center;
`;

const NoData = styled.div`
margin-top: 10px;
    border-top: 2px solid whitesmoke;
height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ShowMsg = styled.h3`
font-weight: 400;
`;