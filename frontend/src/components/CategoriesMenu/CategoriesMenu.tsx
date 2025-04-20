import { useState, useEffect } from 'react';
import { SxProps, Grid, Button, Menu, MenuItem, Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import { iconMapper } from '../../utils/icon-mapper';
import { useMobile } from '../../hooks/useMobile';

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
    const isMobile: boolean = useMobile();
    let queryParams = new URL(document.location.toString()).searchParams;

    async function getCategories(): Promise<void> {
        const response = await fetchWrapper('/vendors/categories', 'GET');
        const data: string[] = (await response.json()).result;
        setCategories(data);
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
                endIcon={
                    <KeyboardArrowDown />
                }
                sx={{
                    ...sx,
                    background: 'none',
                    boxShadow: 'none',
                    '& .MuiButton-endIcon': {
                        marginLeft: '4px',
                    },
                    '&:hover': {
                        background: 'none',
                    },
                }}
                aria-label='categories-menu-dropdown'
                disableRipple
                disableElevation
            >
                Categories
            </Button>
            <Menu
                anchorEl={categoriesMenuAnchor}
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
                marginThreshold={0}
                sx={{
                    height: '100%',
                    maxHeight: isMobile ? '22.5%' : '35%',
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
                            borderBottom: '1px solid rgb(36, 36, 37, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={(e) => {
                            queryParams.set("category", (e.target as HTMLElement).innerText);
                            queryParams.delete("subcategories");
                            queryParams.delete("states");
                            window.history.pushState({}, "", `${location.origin}/results?${queryParams.toString()}`);
                            location.replace(`${location.origin}/results?${queryParams.toString()}`);
                        }}
                    >
                        {iconMapper[category]}
                        <Box sx={{marginLeft: '0.5rem'}}>{category}</Box>
                    </MenuItem>
                ))}
            </Menu>
        </Grid>
    )
};

export { CategoriesMenu };