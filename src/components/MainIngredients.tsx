import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../ui-components/Header'
import { useLocation } from 'react-router-dom';
import ingredientApiService from '../utils/ingredients-api.service';
import { setIngredients } from '../utils/ingredientSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import SwipableCarousel from '../ui-components/SwipableCarousel';
function MainIngredients() {
    const { recipe } = useLocation()?.state as any;
    console.log(recipe);
    const [ingredientsLoader, setIngredientsLoader] = useState(false);
    const ingredients: any = useAppSelector((state) => state.ingredients.ingredients);
    console.log(ingredients);
    const dispatch = useAppDispatch();
    const fetchIngredietsBasedOnRecipe = async () => {
        const data = await ingredientApiService.getIngredientsBasedOnRecipe(recipe.recipe_name);
        console.log(data);
        dispatch(setIngredients(data?.data?.ingredients?.values));
        setIngredientsLoader(false);
    }
    useEffect(() => {
        setIngredientsLoader(true);
        fetchIngredietsBasedOnRecipe();
    }, []);
    return (
        <Container>
            <Header heading="Ingredients" hideSideBar />
            <RecipeContainer>
                <MainContainer>
                    <RecipeViewContainer>
                        <div>
                            <RecipeHeading>{recipe.title}</RecipeHeading>
                            <RecipeDescription className="hideScrollBar" >{recipe.description}</RecipeDescription>
                        </div>
                        <RecipeImg alt={recipe.title} src={recipe.thumbnail} />
                    </RecipeViewContainer>
                </MainContainer>
                <MainContainer>
                    {ingredients && ingredients.length > 0 ? <SwipableCarousel ingredients={ingredients}></SwipableCarousel> :
                        <NoDataMsg>No Ingredients!</NoDataMsg >}
                </MainContainer>
            </RecipeContainer>
        </Container >
    )
}

export default MainIngredients

const RecipeContainer = styled.div`
`;

const Container = styled.div``;
const MainContainer = styled.div`
background-color: white;
margin: 20px;
border-radius: 10px;
padding: 20px 20px 20px 25px;
box-shadow: 0 0 25px rgb(0 0 0 / 10%);
:hover{
    box-shadow: 0 0 25px rgb(0 0 0 / 15%);
}
`;
const RecipeViewContainer = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
`;
const RecipeHeading = styled.h2`
margin-top: 0;
margin-bottom: 5px;
`;
const RecipeDescription = styled.p`
margin-top: 0;
margin-bottom: 0;
height: 150px;
overflow-y: scroll;
`;

const RecipeImg = styled.img`
height:120px;
width:120px;
`;
const NoDataMsg = styled.h2`
text-align: center;
`;
