import { useState } from "react";
import { Vendor } from "../../types/types";
import { TableRow, TableCell, IconButton, Collapse, Box } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { ExpandedRow } from "../ExpandedRow/ExpandedRow";

interface IEnhancedRowProps {
    isMobile: boolean;
    data: Vendor;
}

function EnhancedRow({ isMobile, data }: IEnhancedRowProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <TableRow
                key={data.uuid}
                sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& .MuiTableCell-root': {
                        padding: '1px'
                    }
                }}
            >
                <TableCell sx={{ paddingRight: '3px !important' }} onClick={() => setOpen(!open)}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row' onClick={() => setOpen(!open)}>{data.name}</TableCell>
                {!isMobile && <TableCell onClick={() => setOpen(!open)}>{data.categories}</TableCell>}
                {!isMobile && <TableCell onClick={() => setOpen(!open)}>{data.state}</TableCell>}
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: isMobile ? 0 : '0px 10px' }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, ml: 4, mr: 4}}>
                            <ExpandedRow row={data} isMobile={isMobile}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export { EnhancedRow };