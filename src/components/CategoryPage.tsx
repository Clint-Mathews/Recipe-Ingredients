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

