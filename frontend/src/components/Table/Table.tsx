import React, {useState, useEffect, useMemo, Fragment} from "react";
import { useTable, usePagination } from 'react-table'
import { 
    createColumnHelper,
    flexRender,
    getExpandedRowModel,
    getCoreRowModel,
    useReactTable,
    Row,
    ColumnDef
} from "@tanstack/react-table";
import { Vendor } from "../../types/types";
// import { PaginationBar } from "../../components/PaginationBar/PaginationBar";
// import { HiChevronUpDown, HiChevronUp, HiChevronDown } from "react-icons/hi2";
import { ExpandedRow } from "../ExpandedRow/ExpandedRow";

interface ITableProps {
    isMobile: boolean;
    data: Vendor[];
};

function Table({ isMobile, data }: ITableProps): JSX.Element {
    const [resultsPerPage, setResultsPerPage] = useState<number>(10);
   
    console.log(isMobile);
    const columns: ColumnDef<Vendor>[] = [
        {
            id: "expander",
            header: "",
            cell: ({ row }) => {
                return row.getCanExpand() ? (
                    <button
                      {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: { cursor: 'pointer' },
                      }}
                    >
                      {row.getIsExpanded() ? 'Collapse' : 'Expand'}
                    </button>
                ) :
                <div>Can't expand</div>
            },
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: info => info.renderValue()
        },
        {
            accessorKey: "description",
            header: isMobile ? undefined : "Description",
            cell: isMobile ? undefined : info => info.renderValue()
        },
        {
            accessorKey: "categories",
            header: isMobile ? undefined : "Categories",
            cell: isMobile ? undefined : info => info.renderValue()
        },
        {
            accessorKey: "state",
            header: isMobile ? undefined : "State",
            cell: isMobile ? undefined : info => info.renderValue()
        },
        {
            accessorKey: "email",
            header: undefined,
            cell: () => null
        },
        {
            accessorKey: "website",
            header: undefined,
            cell: () => null
        },
        {
            accessorKey: "people",
            header: undefined,
            cell: () => null
        },
        {
            accessorKey: "address",
            header: undefined,
            cell: () => null
        },
        {
            accessorKey: "city",
            header: undefined,
            cell: () => null
        },
        {
            accessorKey: "zipcode",
            header: undefined,
            cell: () => null
        },
        {
            accessorKey: "phoneNumber",
            header: undefined,
            cell: () => null
        },
    ];

    const table = useReactTable<Vendor>({
        data,
        columns,
        getRowCanExpand: () => true,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });
    
    return (
        <>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? 
                                    null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <Fragment>
                                <tr>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                                {row.getIsExpanded() && <ExpandedRow row={row}/>}
                            </Fragment>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
};

export { Table };