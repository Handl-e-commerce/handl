import React from "react";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from '@mui/material/Checkbox';

interface ICategoryDropDownProps {
    categories: string[];
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    handleQuery: () => void;
}

function CategoryDropDown({categories, selectedCategories, setSelectedCategories, handleQuery}: ICategoryDropDownProps): JSX.Element {
    function handleChange(event: SelectChangeEvent<typeof categories>) {
        const {
          target: { value },
        } = event;
        setSelectedCategories(typeof value === 'string' ? value.split(',') : value,);
    };

    return (
        <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="categories-multiple-checkbox-label">Categories</InputLabel>
            <Select
                multiple
                value={selectedCategories}
                onChange={handleChange}
                onClose={handleQuery}
                renderValue={(selected) => selected.join(', ')}
            >
            {categories.map((subcategory, i) => (
                <MenuItem key={subcategory} value={subcategory}>
                    <Checkbox checked={selectedCategories.indexOf(subcategory) > -1} />
                    <ListItemText primary={subcategory}/>
                </MenuItem>
            ))}
            </Select>
        </FormControl>
    );
};

export { CategoryDropDown };