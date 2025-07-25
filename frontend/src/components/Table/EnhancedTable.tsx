import React, { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableContainer, Paper, SxProps, TablePagination, Box } from "@mui/material";
import { Order, Vendor } from "../../types/types";
import { EnhancedTableHead } from "./EnhancedTableHead";
import { EnhancedRow } from "./EnhancedRow";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Paywall } from "../Paywall/Paywall";
import { cookieParser } from "../../utils/cookie-util";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";

interface ITableProps {
    isMobile: boolean;
    data: Vendor[];
    loadingData: boolean;
};

function EnhancedTable({ isMobile, data, loadingData }: ITableProps): JSX.Element {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Vendor>('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(-1);
    const [savedVendors, setSavedVendors] = useState<string[]>([]);
    const cookiesObject = cookieParser();
    const loggedIn = useLoginStatus();

    async function getSavedVendors(): Promise<void> {
        try {
            const response = await fetchWrapper("/users/me/vendors", "GET");
            const data = (await response.json()).savedVendors.map((vendor: Vendor) => vendor.uuid);
            setSavedVendors(data);
        } catch (error) {
            console.error("Error fetching saved vendors:", error);
            setSavedVendors([]);
        };
    };

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    };

    function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof Vendor): void {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function handleChangePage(event: unknown, newPage: number): void {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>): void {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const visibleRows = useMemo(() => 
        data.slice().sort(
            (a, b) => order === 'desc' ? descendingComparator(a, b, orderBy) : -descendingComparator(a, b, orderBy)
        ).slice(
            page * rowsPerPage,
            rowsPerPage > -1 ? page * rowsPerPage + rowsPerPage : undefined,
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [order, orderBy, page, rowsPerPage, loadingData, data]
    );

    useEffect(() => {
        if (loggedIn) {
            getSavedVendors();
        }
    }, [loggedIn]);

    const boxSx: SxProps = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '97%',
        borderRadius: '4px',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
    }

    const tableContainerSx: SxProps = {
        overflowY: 'scroll',
        background: '#F2F2F7',
        borderBottom: 'none',
        boxShadow: 'none'
    };

    const paginationSx: SxProps = {
        width: '100%',
        minHeight: '52px',
        background: '#E5E5EA',
        color: '#3C3C43',
        '& .MuiTablePagination-selectLabel': {
            fontWeight: 'bold',
            fontSize: '10px',
            position: 'absolute',
            top: '-15%',
            left: isMobile ? '1.45rem' : '2rem',
            color: '#858585',
            zIndex: 1,
            background: '#E5E5EA',
        },
        '& .MuiTablePagination-input': {
            position: 'absolute',
            width: '90px',
            marginLeft: 0,
        },
        '& .MuiTablePagination-select': {
            border: '1px solid #D9D9D9',
            borderRadius: '4px',
            paddingRight: '40px !important',
            color: '#3C3C43',
            fontWeight: 'bold'
        },
        '& .MuiTablePagination-displayedRows': {
            position: 'absolute',
            left: isMobile ? '7.125rem' : '7.5rem',
            fontWeight: 'bold',
        }
    };

    return (
        <Box sx={boxSx}>
            <TableContainer className="HideScrollbar" component={Paper} sx={tableContainerSx}>
                <Table aria-label="Results Table">
                    <EnhancedTableHead isMobile={isMobile} order={order} orderBy={orderBy} onRequestSort={handleRequestSort}/>
                    <TableBody>
                        {visibleRows.map((vendor) => (
                            <EnhancedRow 
                                key={vendor.uuid}
                                isMobile={isMobile}
                                data={vendor}
                                savedVendors={savedVendors}
                                setSavedVendors={setSavedVendors}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {cookiesObject.planType !== 'Premium' && <Paywall />}
            <TablePagination
                rowsPerPageOptions={[25, 50, 100, 200, { label: 'All', value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                component="div"
                labelRowsPerPage='Rows per page'
                sx={paginationSx}
            />
        </Box>
    )
};

export { EnhancedTable };