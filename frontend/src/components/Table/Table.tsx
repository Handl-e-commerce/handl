import React, { useMemo } from "react";
import {
    MaterialReactTable,
    MRT_TablePagination,
    useMaterialReactTable,
    type MRT_ColumnDef,  
} from 'material-react-table';
import { Vendor } from "../../types/types";
import { ExpandedRow } from "../ExpandedRow/ExpandedRow";
import { NoEncryption } from "@mui/icons-material";
import { Box } from "@mui/material";

interface IMTableProps {
    isMobile: boolean;
    data: Vendor[];
};

function Table({ isMobile, data }: IMTableProps): JSX.Element {
    const columns = useMemo<MRT_ColumnDef<Vendor>[]>(() => [
        {
            accessorKey: "name",
            header: "Name",
            size: 50
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "categories",
            header: "Categories",
            size: 100
        },
        {
            accessorKey: "state",
            header: "State",
            size: 10
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "website",
            header: "Website",
        },
        {
            accessorKey: "people",
            header: "People",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "city",
            header: "City",
        },
        {
            accessorKey: "zipcode",
            header: "Zipcode",
        },
        {
            accessorKey: "phoneNumber",
            header: "Phone Number",
        },
    ], [isMobile]);

    const table = useMaterialReactTable({
        columns,
        data,
        initialState: { columnVisibility: {
            description: false,
            categories: !isMobile,
            state: !isMobile,
            email: false,
            website: false,
            people: false,
            address: false,
            city: false,
            zipcode: false,
            phoneNumber: false,
        }},
        enableExpandAll: false,
        renderDetailPanel: ({ row }) => <ExpandedRow row={row} />,
        muiExpandButtonProps: ({ row, table }) => ({
          onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
        }),
        enableBottomToolbar: false,
        muiPaginationProps: {
            rowsPerPageOptions: [10, 25, 50, 100],
            showFirstButton: false,
            showLastButton: false,
        },
        muiTableContainerProps: {
            
        },
        muiTableHeadCellProps: {
            sx: {
                background: '#363636',
                color: 'white',
                '& .MuiButtonBase-root': {
                    color: 'white'
                },
                '& .MuiTableSortLabel-root': {
                    color: 'white',
                },
            }
        },
        muiTableBodyCellProps: {
            sx: {
                background: '#F2F2F7',
                border: '1px solid #F5F5F5'
            }
        },
    });
    
    return (
        <Box>
            <MaterialReactTable table={table} />
            <MRT_TablePagination table={table} sx={{
                fontSize: '12px'
            }}/>
        </Box>
    )
};

export { Table };