import React from "react";
import { FormControl, ListItemText, MenuItem, Select, SelectChangeEvent, Checkbox, SxProps, MenuProps} from '@mui/material';
import { Typography } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";

interface IQueryDropDownProps {
    name: string;
    data: string[];
    selectedData: string[];
    setSelectedData: React.Dispatch<React.SetStateAction<string[]>>;
    handleQuery: () => void;
}

function QueryDropDown({name, data, selectedData, setSelectedData, handleQuery}: IQueryDropDownProps): JSX.Element {
    const isMobile = useMobile();
    
    function handleChange(event: SelectChangeEvent<typeof data>) {
        const {
          target: { value },
        } = event;
        setSelectedData(typeof value === 'string' ? value.split(',') : value,);
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
            width: isMobile ? '80%' : '130%',
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
                multiple
                displayEmpty
                value={selectedData.sort()}
                onChange={handleChange}
                onClose={handleQuery}
                renderValue={() => <Typography variant='body1' component='div'>{name}</Typography>}
                SelectDisplayProps={{
                    // @ts-ignore
                    "data-testid" : `${name.toLowerCase()}-multiple-checkbox-select`,
                }}
                MenuProps={menuProps}
                sx={selectSx}
            >
                {data.map((datum, i) => (
                    <MenuItem key={datum} value={datum} data-testid="menu-item" sx={{ padding: '6px 6px'}}>
                        <Checkbox checked={selectedData.indexOf(datum) > -1} sx={checkmarkSx}/>
                        <ListItemText primary={datum} sx={listItemTextSx}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export { QueryDropDown };