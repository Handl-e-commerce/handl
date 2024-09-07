import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, SxProps, TablePagination, Box } from "@mui/material";
import { Vendor } from "../../types/types";
import { EnhancedTableHead } from "./EnhancedTableHead";

type Order = 'asc' | 'desc';

interface ITableProps {
    isMobile: boolean;
    data: Vendor[];
    loadingData: boolean;
};

function EnhancedTable({ isMobile, data, loadingData }: ITableProps): JSX.Element {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Vendor>('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }

    function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof Vendor): void {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function handleChangePage(event: unknown, newPage: number): void {
        setPage(newPage);
    };

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>): void {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const visibleRows = React.useMemo(() => 
        data.slice().sort(
            (a, b) => order === 'desc' ? descendingComparator(a, b, orderBy) : -descendingComparator(a, b, orderBy)
        ).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage, loadingData]
    );

    const boxSx: SxProps = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '75%',
        maxWidth: '95%',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
    }

    const tableContainerSx: SxProps = {
        overflowY: 'scroll',
        background: '#F2F2F7',
        borderBottom: 'none',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        boxShadow: 'none'
    };

    return (
        <Box sx={boxSx}>
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
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    width: '100%',
                    minHeight: '52px',
                    background: '#E5E5EA',
                    borderRadius: '4px',
                    color: '#3C3C43',
                    '& .MuiToolbar-root-MuiTablePagination-toolbar': {
                        width: '100%'
                    }
                }}
            />
        </Box>
    )
};

export { EnhancedTable };