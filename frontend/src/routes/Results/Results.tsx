import React, { useState, useEffect } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import { vendor, vendorRow } from "../../types/types";
import { ExpandedRow } from "../../components/ExpandedRow/ExpandedRow";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Results(): JSX.Element {
    let queryParams = new URL(document.location.toString()).searchParams;
    const [vendors, setVendors] = useState<vendor[]>([]);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [ids, setIds] = React.useState<string[]>([]);

    const theme = useTheme(getTheme());
    
    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            handleQuery();
        };
        return () => { ignore = true };
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    async function handleQuery(): Promise<void> {
        const response = await fetchWrapper(REACT_APP_SERVER_URI + `/vendors?${queryParams.toString()}`, 'GET');
        const data: vendor[] = (await response.json()).result;
        setVendors(data);
    };

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    };

    const handleExpand = (item: vendorRow) => {
        if (ids.includes(item.id)) {
          setIds(ids.filter((id) => id !== item.id));
        } else {
          setIds(ids.concat(item.id));
        }
      };
    
    // Setting it to 393 to match iPhone 15 width
    const isMobile = width <= 393;

    const COLUMNS = isMobile ? [
        {label: "Name", renderCell: (item: any) => item.name }
    ] : [
        {label: "Name", renderCell: (item: any) => item.name },
        {label: "Description", renderCell: (item: any) => item.description },
        {label: "Categories", renderCell: (item: any) => item.categories },
        {label: "State", renderCell: (item: any) => item.state }
    ];

    const nodes: vendorRow[] = [];
    vendors.forEach((val, i) => {
        nodes.push({
            id: val.uuid,
            name: val.name,
            description: val.description,
            website: val.website,
            categories: val.categories,
            people: val.people,
            address: val.address,
            city: val.city,
            state: val.state,
            zipcode: val.zipcode,
            phoneNumber: val.phoneNumber,
            email: val.email,
        });
    });
    const data = { nodes };
    
    const ROW_PROPS = {
        onClick: handleExpand,
    };    

    const ROW_OPTIONS = {
        renderAfterRow: (row: vendorRow) => <ExpandedRow ids={ids} row={row}/>
    };    
    
    return (
        <CompactTable 
            columns={COLUMNS} 
            rowProps={ROW_PROPS}
            rowOptions={ROW_OPTIONS}
            data={data} 
            theme={theme}
        />
    )
};

export { Results };