import React, { useState, useEffect } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Vendor } from "../../types/types";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { Box, Button, Chip, CircularProgress, Container, Grid, Paper, SxProps, Typography  } from '@mui/material';
import { EnhancedTable } from "../../components/Table/EnhancedTable";
import { useMobile } from "../../hooks/useMobile";
import { QueryDropDown } from "../../components/QueryDropDown/QueryDropDown";
import { states } from "../../utils/constants";

function Results(): JSX.Element {
    let queryParams = new URL(document.location.toString()).searchParams;
    let location = window.location;

    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [categories, setCategories] = useState<string[]>();
    const [selectedCategories, setSelectedCategories] = useState<string[]>(queryParams.get("categories")?.split(",") ?? []);
    const [selectedStates, setSelectedStates] = useState<string[]>(queryParams.get("states")?.split(",") ?? []);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    let isMobile: boolean = useMobile();
    let loggedIn: boolean = useLoginStatus();
    let searchParam = queryParams.get("search-params");
    
    useEffect(() => {
        let ignore = false;
        if (!ignore && loggedIn) {
            handleQuery();
            if (!categories) {
                getCategories();
            };
        };
        return () => { ignore = true };
    }, []);

    async function getData(): Promise<void> {
        setLoadingData(true);
        window.history.pushState("", "", `/results?${queryParams.toString()}`);
        const response = await fetchWrapper(`/vendors?${queryParams.toString()}`, 'GET');
        const data: Vendor[] = (await response.json()).result;
        setVendors(data);
        setLoadingData(false);
    };

    async function handleQuery(): Promise<void> {
        queryParams.delete("categories");
        queryParams.delete("states");
        let categories: string = selectedCategories.join(",");
        let states: string = selectedStates.join(",");
        if (categories.length > 0) queryParams.set("categories", categories);
        if (states.length  > 0) queryParams.set("states", states);
        await getData();
    };

    async function getCategories(): Promise<void> {
        const response = await fetchWrapper('/vendors/categories', 'GET');
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

    function handleRemoveStateChip(state: string): void {
        let filteredStates = selectedStates.filter(val => val !== state);
        setSelectedStates(filteredStates);
        queryParams.delete("states");
        let states: string = filteredStates.join(",");
        states.length > 0 ? queryParams.set("states", states) : queryParams.delete("states");
        getData();
    };

    function handleClearAll(): void {
        setSelectedCategories([]);
        setSelectedStates([]);
        queryParams.delete("categories");
        queryParams.delete("search-params");
        queryParams.delete("states");
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

    const containerSx: SxProps = {
        paddingLeft: '1px', 
        paddingRight: '1px', 
        minHeight: '62.5rem', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: loggedIn ? 'none' : isMobile ? 'none' : 'center',
    }

    if (!loggedIn) {
        return (
            <Container sx={{...containerSx, width: '95%'}}>
                <Paper elevation={24} sx={{width: 'fit-content', padding: 5, background: '#F2F2F7', height: 'fit-content'}}>
                    <Box sx={{}}>
                        <Typography id="modal-title" variant="h4" component="h4" sx={{textAlign: 'center'}}>Login or Sign up to get full access to our data!</Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>Get access to hundreds of wholesalers and distributors today!</Typography>
                        <Button onClick={redirectSignUp} variant="contained" sx={{ marginTop: '7px', marginRight: '4px' }}>Sign Up</Button>
                        <Button onClick={redirectLogin} variant="outlined" sx={{ marginTop: '7px', marginLeft: '4px' }}>Login</Button>
                    </Box>
                </Paper>
            </Container>
        );
    };

    return (
        <Container sx={containerSx}>
            <SearchBar isLandingPage={false} data-testid="search-bar"/>
            <Grid container spacing={1}>
                {categories &&
                    <Grid item sm={isMobile ? undefined : 1.4}> 
                        <QueryDropDown 
                            name="Categories"
                            data={categories}
                            selectedData={selectedCategories}
                            setSelectedData={setSelectedCategories}
                            handleQuery={handleQuery}
                        />
                    </Grid>
                }
                <Grid item sm={isMobile ? undefined : 1.4}>
                    <QueryDropDown 
                        name="States"
                        data={states.map((state) => state.abbreviation).filter((val) => val !== "--")}
                        selectedData={selectedStates}
                        setSelectedData={setSelectedStates}
                        handleQuery={handleQuery}
                    />
                </Grid>
                <Grid item sm={isMobile ? undefined : 1.4}>
                    {(selectedCategories.length > 0 || selectedStates.length > 0 || searchParam) && 
                        <Button 
                            sx={{
                                textTransform: 'none',
                                background: '#E5E5EA',
                                margin: 1,
                                padding: '7px 8px'
                            }}
                            onClick={handleClearAll}
                        >Clear All</Button>
                    }
                </Grid>
            </Grid>
            {searchParam ? <Chip key={searchParam} label={searchParam} sx={{ margin: '4px 1px' }} onDelete={handleRemoveSearchVal}/> : null}
            <Box sx={{ width: '95%', marginBottom: '7px'}} data-testid="chips-container">
                {selectedCategories.map(
                    (category) => (
                        <Chip
                            key={category}
                            label={category}
                            sx={{ margin: '4px 1px' }}
                            onDelete={() => handleRemoveCategoryChip(category)}
                            data-testid={`${category}-chip`}
                        />
                    )
                )}
                {selectedStates.map(
                    (state) => (
                        <Chip
                            key={state}
                            label={state}
                            sx={{ margin: '4px 1px' }}
                            onDelete={() => handleRemoveStateChip(state)}
                            data-testid={`${state}-chip`}
                        />
                    )
                )}
            </Box>
            {loadingData ? <CircularProgress/> : <EnhancedTable isMobile={isMobile} data={vendors} loadingData={loadingData}/>}
        </Container>
    )
};

export { Results };