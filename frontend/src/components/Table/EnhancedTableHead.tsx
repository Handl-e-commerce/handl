import React from "react";
import { Vendor } from "../../types/types";
import { TableHead, TableRow, TableCell, TableSortLabel, Box, SxProps } from "@mui/material";
import { visuallyHidden } from '@mui/utils';

type Order = 'asc' | 'desc';

interface IEnhancedTableProps {
  isMobile: boolean;
  order: Order;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Vendor) => void;
};


interface HeadCell {
    disablePadding: boolean;
    id: keyof Vendor;
    label: string;
    numeric: boolean;
};  

function EnhancedTableHead({ isMobile, order, orderBy, onRequestSort }: IEnhancedTableProps) {
    const tableHeadSx: SxProps = {
        background: '#363636',
        '& .MuiTableCell-root': {
            color: 'white',
            fontWeight: 'bold',
            paddingLeft: '7px',
        },
        '& .MuiTableSortLabel-root': {
            color: 'white',
            fontWeight: 'bold',
            paddingLeft: '7px',
        },
        '& .MuiButtonBase-root-MuiTableSortLabel-root.Mui-active': {
            color: 'white',
            '& .MuiTableSortLabel-icon': {
                color: 'white',
            }
        },
    };

    const createSortHandler =
        (property: keyof Vendor) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
    };

    const headCells: readonly HeadCell[] = isMobile ? [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
    ] : [
        {
          id: 'name',
          numeric: false,
          disablePadding: true,
          label: 'Name',
        },
        {
          id: 'categories',
          numeric: false,
          disablePadding: false,
          label: 'Categories',
        },
        {
          id: 'state',
          numeric: false,
          disablePadding: false,
          label: 'State',
        },
    ];

    return (
        <TableHead sx={tableHeadSx}>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export { EnhancedTableHead };