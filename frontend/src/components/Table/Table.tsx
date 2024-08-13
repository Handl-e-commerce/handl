import React, {useState, useEffect, useMemo} from "react";
import { useTable, usePagination, type Column, type Row } from 'react-table'
import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable 
} from "@tanstack/react-table";
import { Vendor } from "../../types/types";
// import { PaginationBar } from "../../components/PaginationBar/PaginationBar";
// import { HiChevronUpDown, HiChevronUp, HiChevronDown } from "react-icons/hi2";

interface ITableProps {
    isMobile: boolean;
    // purposely setting this to any for the time being in order to get table to render the rows
    data: any;
};

function Table({ isMobile, data }: ITableProps): JSX.Element {
    const [resultsPerPage, setResultsPerPage] = useState<number>(10);
    const columnHelper = createColumnHelper<Vendor[]>();

    const mobileColumn = [
        columnHelper.accessor("name", {
            header: "Name",
            cell: info => info.renderValue(),
        })
    ];

    const desktopColumns = [
        columnHelper.accessor("name", {
            header: "Name",
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor("description", {
            header: "Description",
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor("categories", {
            header: "Categories",
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor("state", {
            header: "State",
            cell: info => info.renderValue(),
        }),
    ];

    let columns = isMobile ? mobileColumn : desktopColumns;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    // <select
    //     value={resultsPerPage}
    //     onChange={(e) => setResultsPerPage(Number(e.target.value))}
    // >
    //     <option value="10">10</option>
    //     <option value="25">25</option>
    //     <option value="50">50</option>
    //     <option value="100">100</option>
    // </select>

    
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
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
};

export { Table };