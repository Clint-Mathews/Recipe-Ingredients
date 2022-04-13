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
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import ViewCard from '../ui-components/ViewCard'

function MainRecipePage() {
    const categories: Category[] = useAppSelector((state) => state.category.category);
    const recipes: Recipe[] = useAppSelector((state) => state.recipes.recipes);
    const [recipeLoader, setRecipeLoader] = useState(false);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const fetchCategoryData = async () => {
        const data = await categoryApiService.getCategories();
        dispatch(setCategories(data?.data?.category?.values));
    }
    const addRecipe: Recipe = {
        title: "",
        description: "",
        thumbnail: "",
        category: "",
        recipe_name: ""
    };

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const fetchRecipeData = async () => {
        const data = await recipeApiService.getRecipesBasedOnCategory(category);
        dispatch(setRecipes(data?.data?.recipes?.values));
        setRecipeLoader(false);
    }

    useEffect(() => {
        if (category) {
            setRecipeLoader(true);
            fetchRecipeData();
        }

    }, [category])

    const viewRecipesBasedOnCategory = (category: string) => {
        dispatch(setRecipes([]));
        setCategory(category);
    }
    const navigateToIngredients = (recipe: Recipe) => {
        navigate('/ingredients', { state: { recipe: recipe } })
    }
    return (
        <Container>
            <Header heading="All Recipes" hideSideBar />
            <RecipeContainer>
                <CategoryContainer>
                    <SubHeaingContainer>
                        <SubHeading heading="Recipes" />
                        <SubContainer>
                            <SelectCategoryField options={categories} setCategory={viewRecipesBasedOnCategory} />
                        </SubContainer>
                    </SubHeaingContainer>
                    {
                        recipeLoader ?
                            <SeletionLoadingContainer>
                                {
                                    [...Array(6)].map((e, i) => {
                                        return (<Box sx={{ pt: 0.5, margin: "20px" }}>
                                            <Skeleton variant="rectangular" width="100%" height={118} />
                                            <Skeleton />
                                            <Skeleton width="60%" />
                                        </Box>)
                                    })
                                }
                            </SeletionLoadingContainer>
                            : (
                                category && recipes.length ? <CardContainer key="CardContainer">
                                    {recipes.map((recipe: Recipe) => {
                                        return (
                                            < ViewCard recipe={recipe} />
                                        )
                                    })
                                    }
                                </CardContainer>
                                    :
                                    <NoData key="NoData">
                                        <ShowMsg key="ShowMsg">{category ? "No Recipes!" : "Please select a category!"}</ShowMsg>
                                    </NoData>
                            )
                    }
                </CategoryContainer>
            </RecipeContainer>
        </Container >
    )
}

export default MainRecipePage


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
const SeletionLoadingContainer = styled.div`
display:grid;
grid-template-columns: repeat(3, 33.33%);
margin-top: 10px;
    border-top: 2px solid whitesmoke;
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

const SubContainer = styled.div`
display: flex;
`;
