import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, SxProps } from "@mui/material";
import { Vendor } from "../../types/types";
import { EnhancedTableHead } from "./EnhancedTableHead";

type Order = 'asc' | 'desc';

interface ITableProps {
    isMobile: boolean;
    data: Vendor[];
};

function Test({isMobile, data}: ITableProps): JSX.Element {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Vendor>('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Vendor,
      ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = React.useMemo(() => 
        data.slice().sort(
            (a, b) => order === 'desc' ? descendingComparator(a, b, orderBy) : -descendingComparator(a, b, orderBy)
        ),
        [order, orderBy, page, rowsPerPage]
    );

    const tableContainerSx: SxProps = {
        overflowY: 'scroll',
        maxHeight: '90%',
        maxWidth: '95%',
        background: '#F2F2F7',
    };

    return (
        <TableContainer className="HideScrollbar" component={Paper} sx={tableContainerSx}>
            <Table aria-label="Results Table">
                <EnhancedTableHead isMobile={isMobile} order={order} orderBy={orderBy} onRequestSort={handleRequestSort}/>
                <TableBody>
                    {visibleRows.map((vendor) => (
                        <TableRow 
                            key={vendor.uuid}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component='th' scope='row'>{vendor.name}</TableCell>
                            {!isMobile && <TableCell>{vendor.categories}</TableCell>}
                            {!isMobile && <TableCell>{vendor.state}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export { Test };