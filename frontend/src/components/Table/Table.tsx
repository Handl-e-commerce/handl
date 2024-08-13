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
   
    const mobileColumn: ColumnDef<Vendor>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: info => info.renderValue()
        },
    ];

    const desktopColumns: ColumnDef<Vendor>[] = [
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
            header: "Description",
            cell: info => info.renderValue()
        },
        {
            accessorKey: "categories",
            header: "Categories",
            cell: info => info.renderValue()
        },
        {
            accessorKey: "state",
            header: "State",
            cell: info => info.renderValue()
        },
    ];

    let columns = isMobile ? mobileColumn : desktopColumns;

    const table = useReactTable<Vendor>({
        data,
        columns,
        getRowCanExpand: () => true,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    function renderExpandedRow(): JSX.Element {
        return (
            <>
                <div>Test to see that it's rendering this component.</div>
            </>
        )
    }
    
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
                                {row.getIsExpanded() && (
                                    <tr>
                                        <td>
                                            {renderExpandedRow()}
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
};

export { Table };