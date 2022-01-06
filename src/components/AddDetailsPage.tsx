import React, { useState, useEffect } from 'react'
import getAPIURL from '../utils/create.url';
import styled from 'styled-components'
import Creatable from 'react-select/creatable';
import ViewCategory from './ViewCategory';
import { Category } from '../models/Category';


function AddDetailsPage() {
    const [categories, setCategories] = useState([]);
    const [inputCategory, setInputCategory] = useState("");
    const fetchData = async () => {
        const response = await fetch(getAPIURL('getCategory'));
        const data = await response.json();
        console.log(data?.data?.category?.values);
        setCategories(data?.data?.category?.values);
    }
    useEffect(() => {
        fetchData();
    }, []);
    const submitCategory = async () => {
        console.log(inputCategory);
        const response = await fetch(getAPIURL('addCategory'), {
            body: JSON.stringify({ data: inputCategory }),
            method: "POST"
        });
        const data = await response.json();
        console.log(data);
        fetchData();
        setInputCategory("");
    }
    const updateCategories = (category: string) => {
        const data = categories.filter((item: Category) => item.value !== category);
        setCategories(prev => data);
    }
    return (
        <Container>
            <CardContainer>
                <Heading>Recipe Shop Updates</Heading>
                <CategoryContainer>
                    <SubHeading>Add - View Category</SubHeading>
                    <ViewCategory categories={categories} updateCategories={updateCategories} />
                    <AddCategoryContainer>
                        <Input type="text" value={inputCategory} onChange={e => setInputCategory(e.target.value)} />
                        <CategorySubmitBut onClick={submitCategory}> Add</CategorySubmitBut>
                    </AddCategoryContainer>
                </CategoryContainer>

            </CardContainer>
        </Container >
    )
}

export default AddDetailsPage

const Container = styled.div`
margin: 10px;
`;
const Heading = styled.h1`
margin: 10px 0 0 20px;
font-weight: 500;
padding-bottom: 10px;
border-bottom: 2px solid whitesmoke;
`;
const SubHeading = styled.h3`
margin:  0 0 0 5px;
`;
const CardContainer = styled.div``;
const CategoryContainer = styled.div`
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
width: 100px;
color: white;
background: #00af9f;
border: 0;
height: 34px;
border: 0;
border-radius: 5px;
transition: background 0.2s ease-in-out;
:hover{
    cursor: pointer;
background:#069b8d;
}
`;
const Input = styled.input`

background-color: whitesmoke;
margin: 0;
outline: 4px solid #d6fdf9;
transition: outline 0.4s ease-in-out;   
    flex: 1;
    margin-right: 10px;
border-radius:5px;
    padding: 0;
    padding-left: 10px;
    width: 80%;
    height: 100%;
    border: 0;
    :focus{
        outline: 0;
        outline: 4px solid #40e0d0;
    }
    :hover{

outline: 4px solid #40e0d0;
}
`;
