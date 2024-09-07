import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, SxProps } from "@mui/material";
import { Vendor } from "../../types/types";

type Order = 'asc' | 'desc';

interface ITableProps {
    isMobile: boolean;
    data: Vendor[];
};

function Test({isMobile, data}: ITableProps): JSX.Element {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Vendor>('name');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
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
      
    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
        return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
    };

    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    const tableContainerSx: SxProps = {
        overflowY: 'scroll',
        maxHeight: '90%',
        maxWidth: '95%',
        background: '#F2F2F7',
    };

    const tableHeadSx: SxProps = {
        background: '#363636',
        '& .MuiTableCell-root': {
            color: 'white',
            fontWeight: 'bold',
        },
    };

    return (
        <TableContainer className="HideScrollbar" component={Paper} sx={tableContainerSx}>
            <Table aria-label="Results Table">
                <TableHead sx={tableHeadSx}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        {!isMobile && <TableCell>Categories</TableCell>}
                        {!isMobile && <TableCell>State</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((vendor) => (
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