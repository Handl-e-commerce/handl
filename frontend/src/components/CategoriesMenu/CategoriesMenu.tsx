import { useState, useEffect } from 'react';
import { SxProps, Grid, Button, Menu, MenuItem } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { fetchWrapper } from '../../utils/fetch-wrapper';

interface ICategoriesMenuProps {
    sx?: SxProps;
};

const menuSx: SxProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
};

function CategoriesMenu({ sx }: ICategoriesMenuProps): JSX.Element {
    const location = window.location;
    const [categoriesMenuAnchor, setCategoriesMenuAnchor] = useState<null | HTMLElement>(null);
    const [categories, setCategories] = useState<string[]>();
    let queryParams = new URL(document.location.toString()).searchParams;

    async function getCategories(): Promise<void> {
        const response = await fetchWrapper('/vendors/categories', 'GET');
        const data: { category: string }[] = (await response.json()).result;
        let categories: string[] = [];
        data.forEach((val, i) => {
            categories.push(val.category);
        });
        setCategories(categories);
    };

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            if (!categories) {
                getCategories();
            };
        };
        return () => { ignore = true };
    }, []);

    return (
        <Grid item sx={menuSx}>
            <Button
                variant="contained"
                onClick={(e: React.MouseEvent<HTMLElement>) => setCategoriesMenuAnchor(e.currentTarget)}
                endIcon={<KeyboardArrowDown />}
                sx={{...sx, background: 'none', boxShadow: 'none'}}
            >
                Categories
            </Button>
            <Menu
                anchorEl={categoriesMenuAnchor}
                aria-label='categories-menu-dropdown'
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                MenuListProps={{
                    sx: {
                        paddingTop: 0,
                        paddingBottom: 0,
                    }
                }}
                sx={{
                    height: '100%',
                }}
                open={Boolean(categoriesMenuAnchor)}
                onClose={() => setCategoriesMenuAnchor(null)}
            >
                {categories && categories.map((category, i) => (
                    <MenuItem
                        key={category}
                        value={category}
                        sx={{ 
                            padding: '6px 6px',
                            borderBottom: '1px solid rgb(36, 36, 37, 0.3)'
                        }}
                        onClick={(e) => {
                            queryParams.set("category", (e.target as HTMLElement).innerText);
                            window.history.pushState({}, "", `${location.origin}/results?${queryParams.toString()}`);
                            location.replace(`${location.origin}/results?${queryParams.toString()}`);
                        }}
                    >
                        {category}
                    </MenuItem>
                ))}
            </Menu>
        </Grid>
    )
};

export { CategoriesMenu };