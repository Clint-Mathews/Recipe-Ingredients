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
import RecipeModal from '../ui-components/RecipeModal';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

function RecipePage() {
    const categories: Category[] = useAppSelector((state) => state.category.category);
    const recipes: Recipe[] = useAppSelector((state) => state.recipes.recipes);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [recipeLoader, setRecipeLoader] = useState(false);
    const handleOpenRecipeAdd = () => setAddModalOpen(true);
    const handleCloseRecipeAdd = () => setAddModalOpen(false);
    const dispatch = useAppDispatch();
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

    return (
        <Container>
            <Header heading="Recipe" />
            <RecipeContainer>
                <CategoryContainer>
                    <SubHeaingContainer>
                        <SubHeading heading="Recipes" />
                        <SubContainer>
                            <AddRecipeBtn onClick={handleOpenRecipeAdd} className={`button ${addModalOpen && 'button-loading'}`}> <span className="button-text">Add Recipe</span></AddRecipeBtn>
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
                                    {recipes.map((item: Recipe) => {
                                        return (
                                            < Cards category={category} recipe={item} />
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
                    {addModalOpen && <RecipeModal category={category} isAdd={true} recipe={addRecipe} open={addModalOpen} handleClose={handleCloseRecipeAdd} />}
                </CategoryContainer>
            </RecipeContainer>
        </Container >
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
const AddRecipeBtn = styled.button`
height: auto;
margin-right: 10px;
position: relative;
margin-left: 10px;
width: 100px;
color: white;
background: #0a66c2;
border: 0;
border: 0;
border-radius: 5px;
transition: all 0.2s ease-in-out;
&.cancel{
color: rgba(41, 41, 41, 1);
background: rgb(0 0 0 / 18%)
}

&.button-loading .button-text{
    visibility: hidden;
    opacity:0;
}

&.button-loading::after{
    content:"";
    position: absolute;
    width: 16px;
    height: 16px;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color:white;
    border-radius: 50%;
    animation : button-loading-spinner 1s linear infinite;
}
@keyframes button-loading-spinner {
    from{
        transform: rotate(0turn);
    }
    to{
        transform: rotate(1turn);
    }
}

:hover,:focus,:active{
cursor: pointer;
background:#004c99;
&.cancel{
background: rgb(0 0 0 / 28%)
}
}
`;
