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
                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>{data.name}</TableCell>
                {!isMobile && <TableCell>{data.categories}</TableCell>}
                {!isMobile && <TableCell>{data.state}</TableCell>}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <ExpandedRow row={data} isMobile={isMobile}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export { EnhancedRow };