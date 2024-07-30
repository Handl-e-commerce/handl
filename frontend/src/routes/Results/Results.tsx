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

    async function handleQuery(): Promise<void> {
        const results = await fetchWrapper(REACT_APP_SERVER_URI + `/vendors?${queryParams.toString()}`, 'GET');
    }

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
        {label: "Description", renderCell: (item: any) => item.description },
        {label: "Categories", renderCell: (item: any) => item.categories },
        {label: "State", renderCell: (item: any) => item.state }
    ];

    let nodes = [
        {
            id: "0",
            name: "Test",
            description: "Test description",
            categories: ["Cat 1, Cat 2, Cat 3"],
            state: "TX"
        }
    ];

    let data = { nodes }

    // Need to blur everything if user isn't logged in

    return (
        // <div></div>
        <CompactTable columns={columns} data={data} />
    )
};

export { Results };