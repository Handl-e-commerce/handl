import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Typography } from "@mui/material";
import { EnhancedTable } from "../../components/Table/EnhancedTable";
import { useMobile } from "../../hooks/useMobile";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Vendor } from "../../types/types";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";

function SavedVendors(): JSX.Element {
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [savedVendors, setSavedVendors] = useState<Vendor[]>([]);
    const isMobile = useMobile();
    const loggedIn = useLoginStatus();

    async function getSavedVendors(): Promise<void> {
        try {
            const response = await fetchWrapper("/users/me/vendors", "GET");
            const data = (await response.json()).savedVendors;
            setSavedVendors(data);
        } catch (error) {
            console.error("Error fetching saved vendors:", (error as Error));
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            getSavedVendors();
        }
    }, []);

    return (
        <Container sx={{ minHeight: '100vh'}}>
            <Typography variant="h4" sx={{ margin: '1rem', fontWeight: 600 }}>Viewing User Favorites</Typography>
            {loadingData ?
                <CircularProgress/> :
                <EnhancedTable
                    isMobile={isMobile}
                    data={savedVendors}
                    loadingData={loadingData}
                />
            }
        </Container>
    );
};

export {SavedVendors};