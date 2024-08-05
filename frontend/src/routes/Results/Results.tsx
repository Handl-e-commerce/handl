import React, { useState, useEffect } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { Pagination, usePagination } from "@table-library/react-table-library/pagination";
import {
    useSort,
    HeaderCellSort,
    SortIconPositions,
    SortToggleType,
} from "@table-library/react-table-library/sort";
import { vendor, vendorRow } from "../../types/types";
import { ExpandedRow } from "../../components/ExpandedRow/ExpandedRow";
import { PaginationBar } from "../../components/PaginationBar/PaginationBar";
import { HiChevronUpDown, HiChevronUp, HiChevronDown } from "react-icons/hi2";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Results(): JSX.Element {
    let queryParams = new URL(document.location.toString()).searchParams;
    const [vendors, setVendors] = useState<vendor[]>([]);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [ids, setIds] = useState<string[]>([]);
    const [resultsPerPage, setResultsPerPage] = useState<number>(10);
    
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

    function handleWindowSizeChange(): void {
        setWidth(window.innerWidth);
    };

    function handleExpand(item: vendorRow): void {
        if (ids.includes(item.id)) {
          setIds(ids.filter((id) => id !== item.id));
        } else {
          setIds(ids.concat(item.id));
        }
    };
    
    // Setting it to 393 to match iPhone 15 width
    const isMobile = width <= 393;

    const COLUMNS = isMobile ? [
        {label: "Name", renderCell: (item: vendor) => item.name, sort: { sortKey: "name"} }
    ] : [
        {label: "Name", renderCell: (item: vendor) => item.name, sort: { sortKey: "name"} },
        {label: "Description", renderCell: (item: vendor) => item.description, sort: { sortKey: "description"} },
        {label: "Categories", renderCell: (item: vendor) => item.categories, sort: { sortKey: "categories"} },
        {label: "State", renderCell: (item: vendor) => item.state, sort: { sortKey: "state"} }
    ];

    const nodes: vendorRow[] = [];
    vendors.forEach((val: vendor, i: number) => {
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

    const sort = useSort(
        data,
        {
            onChange: () => console.log("Sorted"),
        },
        {
            sortIcon: {
                iconDefault: <HiChevronUpDown size={"30px"}/>,
                iconUp: <HiChevronUp size={"20px"}/>,
                iconDown: <HiChevronDown size={"20px"}/>
            },
            sortToggleType: SortToggleType.AlternateWithReset,
            sortFns: {
               name: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
               description: (array) => array.sort((a, b) => a.description.localeCompare(b.description)),
               category: (array) => array.sort((a, b) => a.category.localeCompare(b.category)), // This one may be very tricky
               state: (array) => array.sort((a, b) => a.state.localeCompare(b.state)),
            }
        }
    )

    const pagination: Pagination<vendorRow> = usePagination(data, {
        state: {
            page: 0,
            size: resultsPerPage
        },
    });
    
    const ROW_PROPS = {
        onClick: handleExpand,
    };    

    const ROW_OPTIONS = {
        renderAfterRow: (row: vendorRow) => <ExpandedRow ids={ids} row={row}/>
    };    
    
    return (
        <>
            <CompactTable 
                columns={COLUMNS} 
                rowProps={ROW_PROPS}
                rowOptions={ROW_OPTIONS}
                data={data} 
                theme={theme}
                pagination={pagination}
                sort={sort}
            />
            <PaginationBar
                data={data}
                resultsPerPage={resultsPerPage}
                setResultsPerPage={setResultsPerPage}
                pagination={pagination}
            />
        </>
    )
};

export { Results };