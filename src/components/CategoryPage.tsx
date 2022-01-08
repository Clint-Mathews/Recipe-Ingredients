import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ViewCategory from './ViewCategory';
import InputField from './InputField';
import categoryApiService from '../utils/category-api.service'
import { useAppSelector, useAppDispatch } from '../hooks';
import { setCategories, deleteCategory, addCategory } from '../utils/categorySlice';
import Header from '../ui-components/Header';
import toastService, { ToastType } from '../utils/taostService';
import Label from '../ui-components/Label';
import checkDataExists from '../utils/checkDataExists';
import { Category } from '../models/Category';
import SubHeading from '../ui-components/SubHeading';

function CategoryPage() {
    const [inputCategory, setInputCategory] = useState("");
    const [showAddLoader, setShowAddLoader] = useState(false);
    const categories: any = useAppSelector((state) => state.category.category);
    // console.log(categories);
    const dispatch = useAppDispatch();

    const fetchData = async () => {
        const data = await categoryApiService.getCategories();
        dispatch(setCategories(data?.data?.category?.values));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const submitCategory = async () => {

        if (inputCategory && checkDataExists(categories, inputCategory)) {
            setShowAddLoader(true);
            const data = await categoryApiService.addCategory(inputCategory);
            dispatch(addCategory(data?.data?.insertcategory?.value));
            toastService({ text: "Category added", toastType: ToastType.Success });
            setInputCategory("");
            setShowAddLoader(false);
        } else {
            inputCategory ? toastService({ text: "Category already exits", toastType: ToastType.Error }) :
                toastService({ text: "Invalid Entry", toastType: ToastType.Error });
        }
    }
    const deleteUpdateCategories = (category: string) => {
        dispatch(deleteCategory(category));
    }
    return (
        <Container>
            <Header heading="Recipe Shop Update" />
            <CardContainer>
                <CategoryContainer>
                    <SubHeading heading="Category" />
                    <AddCategoryContainer>
                        <InputField editInput={true} type="text" value={inputCategory} onChange={(e: any) => setInputCategory(e.target.value)} />
                        <CategorySubmitBut onClick={submitCategory} className={`button ${showAddLoader && 'button-loading'}`}> <span className="button-text">Add</span></CategorySubmitBut>
                    </AddCategoryContainer>
                    <ViewCategory categories={categories} deleteUpdateCategories={deleteUpdateCategories} />
                </CategoryContainer>
                {/* <RecipeContainer>
                    <SubHeading heading="Recipe" />
                    <AddRecipeContainer>
                        <FormInputSet>
                            <Label label="Category" />
                            <Select>
                                {categories.map((item: Category) => {
                                    return (<Option key={item.value} value={item.value}>{item.category_name}</Option>)
                                })}
                            </Select>
                        </FormInputSet>
                        <FormInputSet>
                            <Label label="Recipe" />
                            <Input type="text" />
                        </FormInputSet>
                        <FormInputSet>
                            <Label label="Image URL" />
                            <Input type="text" />
                        </FormInputSet>
                        <FormInputDescription>
                            <Label label="Description" />
                            <TextArea ></TextArea>
                        </FormInputDescription>

                        <ButtonContainer>
                            <CategorySubmitBut >Add</CategorySubmitBut>
                            <CategorySubmitBut className="cancel"> Clear</CategorySubmitBut>
                        </ButtonContainer>
                    </AddRecipeContainer>
                </RecipeContainer> */}

            </CardContainer>
        </Container >
    )
}

export default CategoryPage

const Container = styled.div`
`;

const CardContainer = styled.div``;
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

const AddCategoryContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 30px;
margin: 12px 12px 0 10px;
`;
const FormInputSet = styled.div`
height: 54px;
    display: flex;
    flex-direction: column;
    margin: 10px;
`;
const FormInputDescription = styled.div`
grid-column: 1 / 3;
height: 100px;
    display: flex;
    flex-direction: column;
    margin: 0 10px 10px 10px ;
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


const AddRecipeContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
/* margin: 12px 12px 0 10px; */
display: grid;
    grid-template-columns: repeat(3, 33.33%);
`;
const RecipeContainer = styled.div`
background-color: white;
margin: 20px;
border-radius: 10px;
padding: 20px 20px 20px 25px;
box-shadow: 0 0 25px rgb(0 0 0 / 10%);
:hover{
    box-shadow: 0 0 25px rgb(0 0 0 / 15%);
}
`;


const Input = styled.input`
margin: 0;
border-radius:5px;
padding: 0;
padding-left: 10px;
border: 1px solid rgb(0 0 0 / 30%) ;
transition: border 0.4s ease-in-out;   
height: 100%;
:focus,:hover{
    color: black;
    outline: 0;
    border: 1px solid #0a66c2 ;
}
`;

const ButtonContainer = styled.div`
display: flex;
    margin-bottom: 10px;
    align-self: end;
`;

const Select = styled.select`
margin: 0;
border-radius:5px;
padding: 0;
padding-left: 5px;
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
`;