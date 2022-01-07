import React, { useState } from 'react'
import { Category } from '../models/Category'
import InputField from './InputField';
import categoryApiService from '../utils/category-api.service'
import { updateCategory } from '../utils/categorySlice';
import { useAppDispatch } from '../hooks';
import toastService, { ToastType } from '../utils/taostService';

function EditViewInput({ item }: { item: Category }) {
    const dispatch = useAppDispatch();
    const updateCategoryData = async (data: string) => {
        const responseData = await categoryApiService.updateCategory(item, data);
        dispatch(updateCategory(responseData?.data?.updatecategory?.value));
        toastService({ text: "Category updated", toastType: ToastType.Success });
    }
    const [categoryData, setCategoryData] = useState(item.category_name ? item.category_name : "");
    return (
        <InputField value={categoryData} type="text" onChange={(e: any) => setCategoryData(e.target.value)} onBlur={(e: any) => updateCategoryData(e.target.value)} />

    )
}

export default EditViewInput
