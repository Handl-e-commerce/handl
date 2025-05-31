import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Typography } from "@mui/material";
import { EnhancedTable } from "../../components/Table/EnhancedTable";
import { useMobile } from "../../hooks/useMobile";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Vendor } from "../../types/types";

function SavedVendors(): JSX.Element {
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [savedVendors, setSavedVendors] = useState<Vendor[]>([]);
    const isMobile = useMobile();

    async function getSavedVendors(): Promise<void> {
        const response = await fetchWrapper("/users/me/vendors", "GET");
        const data = (await response.json()).savedVendors;
        setSavedVendors(data);
        setLoadingData(false);
    };

    useEffect(() => {
        getSavedVendors();
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