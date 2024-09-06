import React, { useMemo } from "react";
import {
    MaterialReactTable,
    MRT_TablePagination,
    useMaterialReactTable,
    type MRT_ColumnDef,  
} from 'material-react-table';
import { Vendor } from "../../types/types";
import { ExpandedRow } from "../ExpandedRow/ExpandedRow";
import { Container } from "@mui/material";

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
            size: 150
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
        layoutMode: 'grid',
        displayColumnDefOptions: {
            'mrt-row-expand': {
                size: 1
            }
        },
        muiPaginationProps: {
            rowsPerPageOptions: [10, 25, 50, 100],
            showFirstButton: false,
            showLastButton: false,
        },
        muiTablePaperProps: {
            sx: {
                width: '100%'
            }
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
            },
        },
        muiTableBodyCellProps: {
            sx: {
                background: '#F2F2F7',
                border: '1px solid #F5F5F5'
            }
        },
    });
    
    return (
        <Container sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '1px', paddingRight: '1px'}}>
                <MaterialReactTable table={table} />
                <MRT_TablePagination table={table} sx={{
                    '& .MuiTablePagination-root .MuiBox-root': {
                        fontSize: '12px',
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        '& .MuiBox-root': {
                            display: 'flex',
                            flexDirection: 'column',
                            '& .MuiFormLabel-root': {
                                position: 'absolute',
                                top: '1px',
                                background: '#F7F7F7',
    
                            },
                        }
                    }
                }}/>
        </Container>
    )
};

export { Table };