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
        const data: { subcategory: string }[] = (await response.json()).result;
        let categories: string[] = [];
        data.forEach((val, i) => {
            categories.push(val.subcategory);
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
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={Boolean(categoriesMenuAnchor)}
                onClose={() => setCategoriesMenuAnchor(null)}
            >
                {categories && categories.map((category, i) => (
                    <MenuItem
                        key={category}
                        value={category}
                        sx={{ padding: '6px 6px'}}
                        onClick={(e) => {
                            queryParams.set("categories", (e.target as HTMLElement).innerText);
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