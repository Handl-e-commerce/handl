import React, { useState, useEffect, useMemo } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Vendor } from "../../types/types";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { CategoryDropDown } from "../../components/CategoryDropDown/CategoryDropDown";
import { Box, Button, Chip, Container, Paper, Typography  } from '@mui/material';
import { Table } from "../../components/Table/Table";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Results(): JSX.Element {
    let queryParams = new URL(document.location.toString()).searchParams;
    let location = window.location;

    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(queryParams.get("categories")?.split(",") ?? []);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    // Setting it to 393 to match iPhone Plus widths
    const isMobile: boolean = width <= 430;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data: Vendor[] = useMemo(() => vendors, [loadingData]);
    let loggedIn: boolean = useLoginStatus();

    useEffect(() => {
        let ignore = false;
        if ((!ignore && loggedIn) || loadingData) {
            handleQuery();
            getCategories();
        };
        return () => { ignore = true };
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    function handleWindowSizeChange(): void {
        setWidth(window.innerWidth);
    };

    async function getData(): Promise<void> {
        setLoadingData(true);
        window.history.pushState("", "", `/results?${queryParams.toString()}`);
        const response = await fetchWrapper(REACT_APP_SERVER_URI + `/vendors?${queryParams.toString()}`, 'GET');
        const data: Vendor[] = (await response.json()).result;
        setVendors(data);
        setLoadingData(false);
    };

    async function handleQuery(): Promise<void> {
        if (selectedCategories.length === 0)
            queryParams.delete("categories");
        else {
            queryParams.delete("categories");
            let categories: string = selectedCategories.join(",");
            queryParams.set("categories", categories);
        };
        await getData();
    };

    async function getCategories(): Promise<void> {
        const response = await fetchWrapper(REACT_APP_SERVER_URI + '/vendors/categories', 'GET');
        const data: { subcategory: string }[] = (await response.json()).result;
        let categories: string[] = [];
        data.forEach((val, i) => {
            categories.push(val.subcategory);
        });
        setCategories(categories);
    };

    function handleRemoveSearchVal(): void {
        queryParams.delete("search-params");
        window.history.replaceState("", "", `/results?${queryParams.toString()}`);
        window.location.replace(window.location.origin + "/results?" + queryParams.toString());
    };

    function handleRemoveCategoryChip(category: string): void {
        let filteredCategories = selectedCategories.filter(val => val !== category);
        setSelectedCategories(filteredCategories);
        queryParams.delete("categories");
        let categories: string = filteredCategories.join(",");
        categories.length > 0 ? queryParams.set("categories", categories) : queryParams.delete("categories");
        getData();
    };

    function redirectSignUp(): void {
        // redirect to sign up route
        window.history.pushState({}, "", location.origin + "/sign-up?");
        location.replace(location.origin + "/sign-up?");
    };

    function redirectLogin(): void {
        // redirect to login page
        window.history.pushState({}, "", location.origin + "/login?");
        location.replace(location.origin + "/login?");
    };

    if (!loggedIn) {
        return (
            <Container sx={{height: '100%', display: 'flex', justifyContent: 'center'}}>
                <Paper elevation={24} sx={{width: 'fit-content', padding: 5, background: '#F2F2F7', height: 'fit-content'}}>
                    <Box sx={{}}>
                        <Typography id="modal-title" variant="h4" component="h4" sx={{textAlign: 'center'}}>Login or Sign up to get full access to our data!</Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>Get access to hundreds of wholesalers and distributors today!</Typography>
                        <Button onClick={redirectSignUp} variant="contained">Sign Up</Button>
                        <Button onClick={redirectLogin} variant="outlined">Login</Button>
                    </Box>
                </Paper>
            </Container>
        );
    };

    return (
        <>
            <SearchBar isLandingPage={false} data-testid="search-bar"/>
            {categories.length > 0 && <CategoryDropDown 
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                handleQuery={handleQuery}
            />}
            {queryParams.get("search-params") ? <div onClick={handleRemoveSearchVal}>{queryParams.get("search-params")}</div> : null}
            <div data-testid="chips-container">
                {selectedCategories.map((category) => <Chip key={category} label={category} onDelete={() => handleRemoveCategoryChip(category)} />)}
            </div>
            <Table isMobile={isMobile} data={data} data-testid="table"/>
        </>
    )
};

export { Results };