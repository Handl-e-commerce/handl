import React, { useState, useEffect, useMemo } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Vendor } from "../../types/types";
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
    const [subcategories, setSubcategories] = useState<string[]>();
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(queryParams.get("subcategories")?.split(",") ?? []);
    const [selectedStates, setSelectedStates] = useState<string[]>(queryParams.get("states")?.split(",") ?? []);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    let isMobile: boolean = useMobile();
    let loggedIn: boolean = useLoginStatus();
    let searchParam = queryParams.get("search-params");

    const containerSx: SxProps = {
        paddingLeft: '1px', 
        paddingRight: '1px', 
        minHeight: '62.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: loggedIn ? 'none' : isMobile ? 'none' : 'center',
    };

    useEffect(() => {
        let ignore = false;
        if (!ignore && loggedIn) {
            handleQuery();
            if (!subcategories) {
                getSubcategories();
            };
        };
        return () => { ignore = true };
    }, [selectedSubcategories, selectedSubcategories]);

    const handleQuery = async () => {
        console.log('Hitting handleQuery');
        queryParams.delete("subcategories");
        queryParams.delete("states");
        let subcategories: string = selectedSubcategories.join(",");
        let states: string = selectedStates.join(",");
        if (subcategories.length > 0) queryParams.set("subcategories", subcategories);
        if (states.length  > 0) queryParams.set("states", states);
        await getData();
    };

    async function getData(): Promise<void> {
        setLoadingData(true);
        window.history.pushState("", "", `/results?${queryParams.toString()}`);
        const response = await fetchWrapper(`/vendors?${queryParams.toString()}`, 'GET');
        const data: Vendor[] = (await response.json()).result;
        setVendors(data);
        setLoadingData(false);
    };

    async function getSubcategories(): Promise<void> {
        const response = await fetchWrapper(`/vendors/subcategories?${queryParams.toString()}`, 'GET');
        const data: string[] = (await response.json()).result;
        let subcategories: string[] = [];
        data.forEach((subcategory) => {
            if (subcategory === null) {
                return;
            }
            else {
                subcategories.push(subcategory as string);
            };
        });
        setSubcategories(subcategories.sort());
    };

    function handleRemoveSearchVal(): void {
        queryParams.delete("search-params");
        window.history.replaceState("", "", `/results?${queryParams.toString()}`);
        window.location.replace(window.location.origin + "/results?" + queryParams.toString());
    };

    function handleRemoveSubcategoryChip(category: string): void {
        let filteredCategories = selectedSubcategories.filter(val => val !== category);
        setSelectedSubcategories(filteredCategories);
        queryParams.delete("subcategories");
        let categories: string = filteredCategories.join(",");
        categories.length > 0 ? queryParams.set("subcategories", categories) : queryParams.delete("subcategories");
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
        setSelectedSubcategories([]);
        setSelectedStates([]);
        queryParams.delete("subcategories");
        queryParams.delete("search-params");
        queryParams.delete("states");
        getData();
    };

    if (!loggedIn) {
        const redirectSignUp = () =>  {
            // redirect to sign up route
            window.history.pushState({}, "", location.origin + "/sign-up?");
            location.replace(location.origin + "/sign-up?");
        };
    
        const redirectLogin = () => {
            // redirect to login page
            window.history.pushState({}, "", location.origin + "/login?");
            location.replace(location.origin + "/login?");
        };
        return (
            <Container sx={{...containerSx, width: '95%'}}>
                <Paper elevation={24} sx={{width: 'fit-content', padding: 5, background: '#F2F2F7', height: 'fit-content'}}>
                    <Box>
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
            <Typography variant={isMobile ? "h6" : "h4"} sx={{margin: isMobile ? '.5rem' : '1rem', fontWeight: 600 }}>Viewing {queryParams.get("category")}</Typography>
            <Grid container spacing={1}>
                {subcategories && subcategories.length > 0 &&
                    <Grid item sm={isMobile ? 1 : 1.75}>
                        <QueryDropDown 
                            name="Subcategories"
                            data={subcategories}
                            selectedData={selectedSubcategories}
                            setSelectedData={setSelectedSubcategories}
                        />
                    </Grid>
                }
                <Grid item sm={isMobile ? 1 : 1.75}>
                    <QueryDropDown 
                        name="States"
                        data={states.map((state) => state.abbreviation).filter((val) => val !== "--")}
                        selectedData={selectedStates}
                        setSelectedData={setSelectedStates}
                    />
                </Grid>
                <Grid item sm={isMobile ? undefined : 1}>
                    {(selectedSubcategories.length > 0 || selectedStates.length > 0 || searchParam) && 
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
            <Box sx={{ width: '95%', marginBottom: '7px'}} data-testid="chips-container" aria-label="chips-container">
                {selectedSubcategories.map(
                    (subcategory, i) => (
                        <Chip
                            key={i}
                            label={subcategory}
                            sx={{ margin: '4px 1px' }}
                            onDelete={() => handleRemoveSubcategoryChip(subcategory)}
                            data-testid={`${subcategory}-chip`}
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
            {loadingData ?
                <CircularProgress/> :
                <EnhancedTable
                    isMobile={isMobile}
                    data={vendors}
                    loadingData={loadingData}
                />
            }
        </Container>
    );
};

export { Results };