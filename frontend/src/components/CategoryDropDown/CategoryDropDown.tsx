import React from "react";
import { FormControl, ListItemText, MenuItem, Select, SelectChangeEvent, Checkbox} from '@mui/material';
import { Typography } from "@mui/material";

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
        <FormControl sx={{ m: 1, width: 140, textAlign: 'left' }}>
            <Select
                multiple
                displayEmpty
                value={selectedCategories.sort()}
                onChange={handleChange}
                onClose={handleQuery}
                renderValue={() => <Typography variant='body1' component='div'>Categories</Typography>}
                SelectDisplayProps={{
                    // @ts-ignore
                    "data-testid" : "categories-multiple-checkbox-select"
                }}
                sx={{
                    background: '#E5E5EA', 
                    '& .MuiSelect-select': {
                        paddingTop: '7px',
                        paddingLeft: '10px',
                        paddingBottom: '7px'
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    marginLeft: '7px'
                }}
            >
                {categories.map((subcategory, i) => (
                    <MenuItem key={subcategory} value={subcategory} data-testid="menu-item">
                        <Checkbox checked={selectedCategories.indexOf(subcategory) > -1} />
                        <ListItemText primary={subcategory}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export { CategoryDropDown };