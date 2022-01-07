import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ViewCategory from './ViewCategory';
import InputField from './InputField';
import categoryApiService from '../utils/category-api.service'
import { useAppSelector, useAppDispatch } from '../hooks';
import { setCategories, deleteCategory, addCategory } from '../utils/categorySlice';
import Header from './Header';
import toastService, { ToastType } from '../utils/taostService';

function AddDetailsPage() {
    const [inputCategory, setInputCategory] = useState("");
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
        const data = await categoryApiService.addCategory(inputCategory);
        dispatch(addCategory(data?.data?.insertcategory?.value));
        toastService({ text: "Category added", toastType: ToastType.Success });
        setInputCategory("");
    }
    const deleteUpdateCategories = (category: string) => {
        dispatch(deleteCategory(category));
    }
    return (
        <Container>
            <Header heading="Recipe Shop Updates" />
            <CardContainer>
                <CategoryContainer>
                    <SubHeading>Category</SubHeading>
                    <ViewCategory categories={categories} deleteUpdateCategories={deleteUpdateCategories} />
                    <AddCategoryContainer>
                        <InputField editInput={true} type="text" value={inputCategory} onChange={(e: any) => setInputCategory(e.target.value)} />
                        <CategorySubmitBut onClick={submitCategory}> Add</CategorySubmitBut>
                    </AddCategoryContainer>
                </CategoryContainer>

            </CardContainer>
        </Container >
    )
}

export default AddDetailsPage

const Container = styled.div`
`;
const SubHeading = styled.h2`
margin:  0 0 0 10px;
font-size:1.6rem;
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
margin: 0 5px 10px 10px;
`;
const CategorySubmitBut = styled.button`
margin-left: 10px;
width: 100px;
color: white;
background: #0a66c2;
border: 0;
height: 34px;
border: 0;
border-radius: 5px;
transition: background 0.2s ease-in-out;
:hover{
    cursor: pointer;
background:#004c99;
}
`;

