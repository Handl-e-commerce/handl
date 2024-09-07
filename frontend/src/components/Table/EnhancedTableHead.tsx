import React from "react";
import { Vendor } from "../../types/types";
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from '@mui/utils';

type Order = 'asc' | 'desc';

interface IEnhancedTableProps {
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
  
const headCells: readonly HeadCell[] = [
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
  

function EnhancedTableHead({ order, orderBy, onRequestSort }: IEnhancedTableProps) {
  const createSortHandler =
    (property: keyof Vendor) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
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