import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, SxProps } from "@mui/material";
import { Vendor } from "../../types/types";

interface ITableProps {
    isMobile: boolean;
    data: Vendor[];
};

function Test({isMobile, data}: ITableProps): JSX.Element {
    const tableContainerSx: SxProps = {
        overflowY: 'scroll',
        maxHeight: '90%',
        maxWidth: '95%',
        background: '#F2F2F7',
    }

    const tableHeadSx: SxProps = {
        background: '#363636',
        '& .MuiTableCell-root': {
            color: 'white',
            fontWeight: 'bold',
        },
    }

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