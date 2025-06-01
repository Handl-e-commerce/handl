import React, { useState, useEffect } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Vendor } from "../../types/types";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { Box, Button, Chip, CircularProgress, Container, Grid, SxProps, Typography  } from '@mui/material';
import { EnhancedTable } from "../../components/Table/EnhancedTable";
import { useMobile } from "../../hooks/useMobile";
import { QueryDropDown } from "../../components/QueryDropDown/QueryDropDown";
import { states } from "../../utils/constants";

function Results(): JSX.Element {
    const queryParams = new URL(document.location.toString()).searchParams;
    const location = window.location;
    const category = decodeURIComponent(location.pathname.split("/")[2]);

    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [subcategories, setSubcategories] = useState<string[]>();
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(queryParams.get("subcategories")?.split(",") ?? []);
    const [selectedStates, setSelectedStates] = useState<string[]>(queryParams.get("states")?.split(",") ?? []);
    

    let isMobile: boolean = useMobile();
    let loggedIn: boolean = useLoginStatus();
    // TODO: (LOW) Remove search params since we're not using it for the time being?
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
        if (loggedIn) {
            handleQuery();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSubcategories, selectedStates]);

    useEffect(() => {
        if (!subcategories) getSubcategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleQuery = async () => {
        queryParams.delete("subcategories");
        queryParams.delete("states");
        let subcategories: string = selectedSubcategories.join(",");
        let states: string = selectedStates.join(",");
        if (subcategories.length > 0) queryParams.set("subcategories", subcategories);
        if (states.length  > 0) queryParams.set("states", states);
        setLoadingData(true);
        window.history.pushState("", "", `/results/${category}?${queryParams.toString()}`);
        const response = await fetchWrapper(`/vendors/categories/${category}?${queryParams.toString()}`, 'GET');
        const data: Vendor[] = (await response.json()).result;
        setVendors(data);
        setLoadingData(false);
    };

    async function getSubcategories(): Promise<void> {
        // TODO: (LOW) Quick and dirty hack, find a way to make this better
        const response = await fetchWrapper(`/vendors/subcategories?category=${category}`, 'GET');
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
    };

    function handleRemoveStateChip(state: string): void {
        let filteredStates = selectedStates.filter(val => val !== state);
        setSelectedStates(filteredStates);
        queryParams.delete("states");
        let states: string = filteredStates.join(",");
        states.length > 0 ? queryParams.set("states", states) : queryParams.delete("states");
    };

    function handleClearAll(): void {
        setSelectedSubcategories([]);
        setSelectedStates([]);
        queryParams.delete("subcategories");
        queryParams.delete("search-params");
        queryParams.delete("states");
    };

    // TODO: (HIGH) Implement paywall logic
    return (
        <Container sx={containerSx}>
            <Typography variant={isMobile ? "h6" : "h4"} sx={{margin: isMobile ? '.5rem' : '1rem', fontWeight: 600 }}>Viewing {category}</Typography>
            <Grid container spacing={1} aria-label="options-container">
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
                        >
                            Clear All
                        </Button>
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