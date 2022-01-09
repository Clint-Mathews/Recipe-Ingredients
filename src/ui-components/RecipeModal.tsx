import React, { useReducer, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import SubHeading from './SubHeading';
import Label from './Label';
import { Category } from '../models/Category';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Recipe } from '../models/Recipe';
import { UPDATE_FORM, onInputChange, onFocusOut, validateInput } from "../utils/formUtils"
import toastService, { ToastType } from '../utils/taostService';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import recipeApiService from '../utils/recipe-api.service';
import { updateRecipe, addRecipe } from '../utils/recipeSlice';

function RecipeModal({ recipe, open, handleClose, isAdd, category }: { recipe: Recipe, open: boolean, handleClose: () => void, isAdd: boolean, category: string }) {
    const initialState = {
        category: { value: recipe.category ? recipe.category : category, touched: false, hasError: true, error: "" },
        title: { value: recipe.title },
        thumbnail: { value: recipe.thumbnail, touched: false, hasError: true, error: "" },
        description: { value: recipe.description, touched: false, hasError: true, error: "" },
        recipe_name: { value: recipe.recipe_name, touched: false, hasError: true, error: "" },
        isFormValid: false,
    }
    const [isLoading, setIsLoading] = useState(false);
    const formsReducer = (state: any, action: any) => {
        switch (action.type) {
            case UPDATE_FORM:
                const { name, value, hasError, error, touched, isFormValid } = action.data
                return {
                    ...state,
                    // update the state of the particular field,
                    // by retaining the state of other fields
                    [name]: { ...state[name], value, hasError, error, touched },
                    isFormValid,
                }
            default:
                return state
        }
    }
    const [formState, formdispatch] = useReducer(formsReducer, initialState);
    const categories: any = useAppSelector((state) => state.category.category);
    const dispatch = useAppDispatch();
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid whitesmoke',
        boxShadow: 24,
        borderRadius: "5px",
        p: 2,
    };
    const updateForm = async (e: any) => {
        e.preventDefault();
        let isFormValid = true

        for (const name in formState) {
            const item = formState[name]
            const { value } = item
            const { hasError, error } = validateInput(name, value)
            if (hasError) {
                isFormValid = false
            }
            if (name) {
                formdispatch({
                    type: UPDATE_FORM,
                    data: {
                        name,
                        value,
                        hasError,
                        error,
                        touched: true,
                        isFormValid,
                    },
                })
            }
        }
        if (!isFormValid) {
            toastService({ text: "Please update the fields", toastType: ToastType.Error });
        } else {
            setIsLoading(true);
            const data: Recipe = {
                category: formState.category.value,
                title: isAdd ? formState.recipe_name.value : formState.title.value,
                thumbnail: formState.thumbnail.value,
                description: formState.description.value,
                recipe_name: formState.recipe_name.value,
            }
            const responseData = isAdd ? await recipeApiService.addRecipe(data) : await recipeApiService.updateRecipe(data);
            if (isAdd) {
                if (category === data.category)
                    dispatch(addRecipe(responseData?.data?.insertrecipes?.value));
            } else {
                dispatch(updateRecipe(responseData?.data?.updaterecipes?.value));
            }
            setIsLoading(false);
            toastService({ text: `Recipe ${isAdd ? 'added' : 'updated'}`, toastType: ToastType.Success });
            handleClose();
        }
    }
    return (
        <Modal
            open={open}
            hideBackdrop
            onClose={handleClose}
            id="recipe-ingedients-modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <FormContainer onSubmit={e => updateForm(e)}>
                        <HeadContainer>
                            <SubHeading heading="Recipe" />
                            <ButtonContainer>
                                <CategorySubmitBut type="submit" className={`button ${isLoading && 'button-loading'}`} value="Update"> <span className="button-text">{isAdd ? "Add" : "Update"} </span></CategorySubmitBut>
                                <CategorySubmitBut type="button" onClick={handleClose} className="cancel"> Cancel</CategorySubmitBut>
                            </ButtonContainer>
                        </HeadContainer>
                        <AddRecipeContainer>
                            <FormInputSet>
                                <Label label="Category" />
                                <Select disabled={!isAdd} className={formState.category.touched && formState.category.hasError && `error`} value={formState.category.value} onChange={e => {
                                    onInputChange("category", e.target.value, formdispatch, formState)
                                }} onBlur={e => {
                                    onFocusOut("category", e.target.value, formdispatch, formState)
                                }}>
                                    <Option value="" > Select Category </Option>
                                    {categories.map((item: Category) => {
                                        return (<Option key={item.value} value={item.value}>{item.category_name}</Option>)
                                    })}
                                </Select>
                                {formState.category.touched && formState.category.hasError && (
                                    <ErrorMsg className="error">{formState.category.error}</ErrorMsg>
                                )}
                            </FormInputSet>
                            <FormInputSet>
                                <Label label="Recipe" />
                                <Input className={formState.recipe_name.touched && formState.recipe_name.hasError && `error`} type="text" value={formState.recipe_name.value} onChange={e => {
                                    onInputChange("recipe_name", e.target.value, formdispatch, formState)
                                }} onBlur={e => {
                                    onFocusOut("recipe_name", e.target.value, formdispatch, formState)
                                }} />
                                {formState.recipe_name.touched && formState.recipe_name.hasError && (
                                    <ErrorMsg className="error">{formState.recipe_name.error}</ErrorMsg>
                                )}
                            </FormInputSet>
                            <FormInputSet>
                                <Label label="Image URL" />
                                <Input className={formState.thumbnail.touched && formState.thumbnail.hasError && `error`} type="text" value={formState.thumbnail.value} onChange={e => {
                                    onInputChange("thumbnail", e.target.value, formdispatch, formState)
                                }} onBlur={e => {
                                    onFocusOut("thumbnail", e.target.value, formdispatch, formState)
                                }} />
                                {formState.thumbnail.touched && formState.thumbnail.hasError && (
                                    <ErrorMsg className="error">{formState.thumbnail.error}</ErrorMsg>
                                )}
                            </FormInputSet>
                            <FormInputDescription>
                                <Label label="Description" />
                                <TextArea className={formState.description.touched && formState.description.hasError && `error`} value={formState.description.value} onChange={e => {
                                    onInputChange("description", e.target.value, formdispatch, formState)
                                }} onBlur={e => {
                                    onFocusOut("description", e.target.value, formdispatch, formState)
                                }}></TextArea>
                                {formState.description.touched && formState.description.hasError && (
                                    <ErrorMsg className="error">{formState.description.error}</ErrorMsg>
                                )}
                            </FormInputDescription>
                        </AddRecipeContainer>
                    </FormContainer>
                </Box>
            </Fade>
        </Modal>
    )
}

export default RecipeModal


const AddRecipeContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
/* margin: 12px 12px 0 10px; */
display: grid;
    grid-template-columns: repeat(3, 33.33%);
`;
// const RecipeContainer = styled.div`
// background-color: white;
// margin: 20px;
// border-radius: 10px;
// padding: 20px 20px 20px 25px;
// box-shadow: 0 0 25px rgb(0 0 0 / 10%);
// :hover{
//     box-shadow: 0 0 25px rgb(0 0 0 / 15%);
// }
// `;
const FormContainer = styled.form``;
const HeadContainer = styled.div`
display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;

const Input = styled.input`
margin: 0;
border-radius:5px;
padding: 0;
padding: 10px;
border: 1px solid rgb(0 0 0 / 30%) ;
transition: border 0.4s ease-in-out;   
height: 100%;
:focus,:hover{
    color: black;
    outline: 0;
    border: 1px solid #0a66c2 ;
}
        &.error{
            transition: none;  
            border: 1px solid red ;
        }
`;

const ButtonContainer = styled.div`
display: flex;
    align-self: end;
    margin:0 10px 0 0;
`;

const Select = styled.select`
margin: 0;
border-radius:5px;
padding: 10px;
border: 1px solid rgb(0 0 0 / 30%) ;
transition: border 0.4s ease-in-out;   
height: 100%;
:focus,:hover{
    color: black;
    outline: 0;
    border: 1px solid #0a66c2 ;
}
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance:none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
          &.error{
            transition: none;  
            border: 1px solid red ;
        }
:disabled{
    color: black;
    outline: 0;
    cursor:not-allowed;
    border: 1px solid rgb(0 0 0 / 30%) ;
}
`;

const Option = styled.option`
margin: 0;
border-radius:5px;
padding: 0;
height: 35px;
`;

const TextArea = styled.textarea`
margin: 0;
border-radius:5px;
padding: 10px;
border: 1px solid rgb(0 0 0 / 30%) ;
transition: border 0.4s ease-in-out;   
height: 100%;
 resize: none;
:focus,:hover{
    color: black;
    outline: 0;
    border: 1px solid #0a66c2 ;
}
        &.error{
            transition: none;   
            border: 1px solid red ;
        }
`;

const FormInputSet = styled.div`
height: 54px;
    display: flex;
    flex-direction: column;
    margin: 10px;
        position: relative;
        padding-bottom: 18px;
`;
const FormInputDescription = styled.div`
grid-column: 1 / 4;
height: 100px;
    display: flex;
    flex-direction: column;
    margin: 0 10px;
            position: relative;
        padding-bottom: 18px;

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
const ErrorMsg = styled.div`
color: red;
    position: absolute;
    bottom: -2px;
    font-size: 12px;
`;
