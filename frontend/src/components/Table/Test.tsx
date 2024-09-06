import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Vendor } from "../../types/types";

interface ITableProps {
    isMobile: boolean;
    data: Vendor[];
};

function Test({isMobile, data}: ITableProps): JSX.Element {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '95%'}} aria-label="Results Table">
                <TableHead>
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