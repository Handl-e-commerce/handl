import { useState } from "react";
import { Vendor } from "../../types/types";
import { TableRow, TableCell, IconButton, Collapse, Box, Link } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { ExpandedRow } from "../ExpandedRow/ExpandedRow";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";

interface IEnhancedRowProps {
    isMobile: boolean;
    data: Vendor;
    savedVendors: string[];
    setSavedVendors: React.Dispatch<React.SetStateAction<string[]>>;
}

function EnhancedRow({ isMobile, data, savedVendors, setSavedVendors }: IEnhancedRowProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const loggedIn = useLoginStatus();
    
    function formatValue(value: string): string {
        return value === '' ? 'Coming soon' : value;
    };

    async function updateSavedVendors(newVendorIds: string[]) {
        await fetchWrapper("/users/vendors/save", "PUT", {
            vendorIds: newVendorIds,
        });
    };

    async function handleSavedVendorChange() {
        if (savedVendors.includes(data.uuid)) {
            const newVendorIds = savedVendors.filter((vendorId) => vendorId !== data.uuid);
            setSavedVendors(newVendorIds);
            updateSavedVendors(newVendorIds);
        }
        else {
            setSavedVendors([...savedVendors, data.uuid]);
            updateSavedVendors([...savedVendors, data.uuid]);
        }
    };

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
                {!isMobile && <TableCell onClick={() => setOpen(!open)}>{
                    <Link
                        href={data.website} 
                        target="_blank"
                        rel="noreferrer"
                        underline="none"
                        color='#3C8DBC'
                    >
                        {formatValue(data.website.toLocaleLowerCase())}
                    </Link>
                }</TableCell>}
                {!isMobile && <TableCell onClick={() => setOpen(!open)}>{formatValue(data.phoneNumber)}</TableCell>}
                {!isMobile && <TableCell onClick={() => setOpen(!open)}>{formatValue(data.state)}</TableCell>}
                {loggedIn && <TableCell>
                    <IconButton
                        onClick={handleSavedVendorChange}
                        aria-label="icon-button-favorite"
                    >
                        {savedVendors.includes(data.uuid) ? <Favorite sx={{
                            color: '#DC4637'
                        }}/> : <FavoriteBorder />}
                    </IconButton>
                </TableCell>}
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