import React, {useState, useEffect, useMemo} from "react";
import { type Column, useTable } from 'react-table'
import { vendor } from "../../types/types";
// import { PaginationBar } from "../../components/PaginationBar/PaginationBar";
// import { HiChevronUpDown, HiChevronUp, HiChevronDown } from "react-icons/hi2";

interface ITableProps {
    isMobile: boolean;
    data: vendor[];
};

function Table({ isMobile, data }: ITableProps): JSX.Element {
    const [resultsPerPage, setResultsPerPage] = useState<number>(10);
    
    const columns: Column<{ name: string; }>[] | Column<{ name: string; description: string; categories: string; state: string }>[] = useMemo(() => {
        return isMobile ? [
            {Header: "Name", accessor: 'name', }
        ] : [
            {Header: "Name", accessor: 'name', },
            {Header: "Description", accessor: 'description', },
            {Header: "Categories", accessor: 'categories', },
            {Header: "State", accessor: 'state', },
        ];
    }, [isMobile]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });
    

    return (
        <table>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr key={headerGroup.getFooterGroupProps().key} role={headerGroup.getHeaderGroupProps().role}>
                    {headerGroup.headers.map(column => (
                        <th
                            key={column.getHeaderProps().key}
                            role={column.getHeaderProps().role}
                            style={{
                                borderBottom: 'solid 3px red',
                                background: 'aliceblue',
                                color: 'black',
                                fontWeight: 'bold',
                            }}
                            >
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                    <tr key={row.getRowProps().key} role={row.getRowProps().role}>
                        {row.cells.map(cell => {
                            return (
                                <td
                                    key={cell.getCellProps().key}
                                    role={cell.getCellProps().role}
                                    style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                        background: 'papayawhip',
                                    }}
                                >
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )})}
            </tbody>
        </table>
    )
};

export { Table };