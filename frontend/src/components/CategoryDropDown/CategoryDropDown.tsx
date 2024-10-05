import React from "react";
import { FormControl, ListItemText, MenuItem, Select, SelectChangeEvent, Checkbox, SxProps, MenuProps} from '@mui/material';
import { Typography } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";

interface ICategoryDropDownProps {
    categories: string[];
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    handleQuery: () => void;
}

function CategoryDropDown({categories, selectedCategories, setSelectedCategories, handleQuery}: ICategoryDropDownProps): JSX.Element {
    const isMobile = useMobile();
    
    function handleChange(event: SelectChangeEvent<typeof categories>) {
        const {
          target: { value },
        } = event;
        setSelectedCategories(typeof value === 'string' ? value.split(',') : value,);
    };

    const selectSx: SxProps = {
        background: '#E5E5EA',
        '& .MuiSelect-select': {
            paddingTop: '7px',
            paddingLeft: '10px',
            paddingBottom: '7px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '7px'
    };

    const menuProps: Partial<MenuProps> = {
        sx: {
            width: isMobile ? '80%' : '100%'
        },
        MenuListProps: {
            sx: {
                background: '#E5E5EA',
            }
        }
    };

    const checkmarkSx: SxProps = {
        width: isMobile ? '32px' : '48px',
        height: isMobile ? '32px' : '48px',
    };

    const listItemTextSx: SxProps = {
        '& .MuiTypography-root': {
            fontSize: isMobile ? '.75rem' : '1rem'
        }
    };

    return (
        <FormControl sx={{ m: 1, width: 140, textAlign: 'left' }}>
            <Select
                autoWidth={!isMobile}
                multiple
                displayEmpty
                value={selectedCategories.sort()}
                onChange={handleChange}
                onClose={handleQuery}
                renderValue={() => <Typography variant='body1' component='div'>Categories</Typography>}
                SelectDisplayProps={{
                    // @ts-ignore
                    "data-testid" : "categories-multiple-checkbox-select",
                }}
                MenuProps={menuProps}
                sx={selectSx}
            >
                {categories.map((subcategory, i) => (
                    <MenuItem key={subcategory} value={subcategory} data-testid="menu-item" sx={{ padding: '6px 6px'}}>
                        <Checkbox checked={selectedCategories.indexOf(subcategory) > -1} sx={checkmarkSx}/>
                        <ListItemText primary={subcategory} sx={listItemTextSx}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export { CategoryDropDown };