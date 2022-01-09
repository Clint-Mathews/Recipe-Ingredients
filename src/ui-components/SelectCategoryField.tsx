import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Category } from '../models/Category';

function SelectCategoryField({ options, setCategory }: { options: Category[], setCategory: (data: any) => void }) {
    // console.log(options);
    const [age, setAge] = React.useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value);
        setCategory(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Select
                    className="SelectHover"
                    size='small'
                    displayEmpty
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItem key="default" value="">
                        <em>Category</em>
                    </MenuItem>
                    {options.map((item: Category) => {
                        return (
                            <MenuItem key={item.value} value={item.value}>{item.category_name}</MenuItem>
                        )
                    })
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectCategoryField
