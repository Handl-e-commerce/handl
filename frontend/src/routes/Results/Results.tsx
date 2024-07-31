import React, { useState, useEffect } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { CompactTable } from '@table-library/react-table-library/compact';

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

type vendor = {
    uuid: string;
    name: string;
    description: string;
    website: string;
    categories: string;
    people: string[];
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    email: string;
}

function Results(): JSX.Element {
    let queryParams = new URL(document.location.toString()).searchParams;
    const [vendors, setVendors] = useState<vendor[] | undefined>(undefined);
    const [width, setWidth] = useState<number>(window.innerWidth);
    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            handleQuery();
        };
        return () => { ignore = true };
    }, []);

    async function handleQuery(): Promise<void> {
        const response = await fetchWrapper(REACT_APP_SERVER_URI + `/vendors?${queryParams.toString()}`, 'GET');
        const data: vendor[] = (await response.json()).result;
        setVendors(data);
    };

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

    const nodes: any = [];
    if (vendors) {
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
    };

    const data = { nodes };
    return (
        <div>
            {vendors && <CompactTable columns={columns} data={data} />}
        </div>
    )
};

export { Results };