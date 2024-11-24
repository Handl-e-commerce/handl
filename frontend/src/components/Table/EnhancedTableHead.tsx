import React from "react";
import { Vendor } from "../../types/types";
import { TableHead, TableRow, TableCell, TableSortLabel, Box, SxProps } from "@mui/material";
import { KeyboardArrowUpOutlined, KeyboardArrowDownOutlined } from "@mui/icons-material";
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
        height: '36px',
    };

    const createSortHandler =
        (property: keyof Vendor) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
    };

    type CustomHeadCell = HeadCell & { width: string };
    const columns: readonly CustomHeadCell[] = isMobile ? [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
            width: '100%'
        },
    ] : [
        {
          id: 'name',
          numeric: false,
          disablePadding: true,
          label: 'Name',
          width: '25%'
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: true,
            label: 'Email',
            width: '30%'
        },
        {
          id: 'phoneNumber',
          numeric: false,
          disablePadding: true,
          label: 'Phone Number',
          width: '30%'
        },
        {
          id: 'state',
          numeric: false,
          disablePadding: true,
          label: 'State',
          width: '5%'
        },
    ];

    return (
        <TableHead sx={tableHeadSx}>
            <TableRow sx={{
                '& .MuiTableCell-root': {
                    padding: '1px'
                }
            }}>
                <TableCell />
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.numeric ? 'right' : 'left'}
                        padding={column.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === column.id ? order : false}
                        sx={{ width: column.width }}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={createSortHandler(column.id)}
                            IconComponent={orderBy === column.id ? KeyboardArrowUpOutlined : KeyboardArrowDownOutlined }
                            sx={{ paddingLeft: 0 }}
                        >
                        {column.label}
                        {orderBy === column.id ? (
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