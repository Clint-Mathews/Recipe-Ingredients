import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { Recipe } from '../models/Recipe';
import recipeApiService from '../utils/recipe-api.service';
import toastService, { ToastType } from '../utils/taostService';
import { useAppDispatch } from '../hooks';
import { deleteRecipe } from '../utils/recipeSlice';
import Fade from '@mui/material/Fade';

function RecipeDeleteModal({ open, handleClose, recipe }: { open: boolean, handleClose: () => void, recipe: Recipe }) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const deleteRecipeFn = async () => {
        setIsLoading(true);
        const responseData = await recipeApiService.deleteRecipeFromList(recipe);
        dispatch(deleteRecipe(responseData?.data?.deleterecipes?.value?.title));
        toastService({ text: `Recipe deleted`, toastType: ToastType.Success });
        setIsLoading(false);
        handleClose();
    }
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid whitesmoke',
        boxShadow: 24,
        borderRadius: "5px",
        p: 2,
    };
    return (
        <Modal
            open={open}
            keepMounted
            hideBackdrop
            onClose={handleClose}
            id="recipe-ingedients-modal"
        >
            <Fade in={open}>
                <Box sx={style}>
                    <ModalHeader>
                        <SubHeadingContainer>Delete</SubHeadingContainer>
                    </ModalHeader>
                    <ContentContainer>
                        <MainContentContainer>
                            Do you want to delete recipe - {recipe.recipe_name} ?
                        </MainContentContainer>
                        <ButtonContainer>
                            <CategorySubmitBut type="button" onClick={deleteRecipeFn} className={`button ${isLoading && 'button-loading'}`} value="Update"> <span className="button-text"> Delete </span></CategorySubmitBut>
                            <CategorySubmitBut type="button" onClick={handleClose} className="cancel"> Cancel</CategorySubmitBut>
                        </ButtonContainer>
                    </ContentContainer>
                </Box>
            </Fade>
        </Modal>
    )
}

export default RecipeDeleteModal

const ModalHeader = styled.div`
display: flex;
justify-content: center;
border-bottom: 1.5px solid whitesmoke;
    padding-bottom: 10px;
`;
const SubHeadingContainer = styled.h2`
margin:  0;
font-size:1.6rem;
`;

const ContentContainer = styled.div``;
const ButtonContainer = styled.div`
display: flex;
justify-content: center;
padding: 10px;
`;

const CategorySubmitBut = styled.button`
position: relative;
margin-left: 10px;
width: 100px;
color: white;
background: #0a66c2;
border: 0;
height: 34px;
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

const MainContentContainer = styled.p`
    text-align: center;
`;