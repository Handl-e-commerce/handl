import React, { useState, useEffect } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { CompactTable } from '@table-library/react-table-library/compact';

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Results(): JSX.Element {
    let queryParams = new URL(document.location.toString()).searchParams;
    const [vendors, setVendors] = useState();
    const [width, setWidth] = useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    
    // Setting it to 393 to match iPhone 15 width
    const isMobile = width <= 393;

    const columns = isMobile ? [
        {label: "Name", renderCell: (item: any) => item.name }
    ] : [
        {label: "Name", renderCell: (item: any) => item.name },
        {label: "Description", renderCell: (item: any) => item.name },
        {label: "Categories", renderCell: (item: any) => item.name },
        {label: "State", renderCell: (item: any) => item.name }
    ];
    async function handleQuery(): Promise<void> {
        const results = await fetchWrapper(REACT_APP_SERVER_URI + `/vendors?${queryParams.toString()}`, 'GET');
    }

    // Can just throw an if statement here to render 1 Column or 4 for mobile vs desktop

    return (
        <CompactTable columns={columns} data={}/>
    )
};

export { Results };