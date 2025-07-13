import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/material";

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxHeight: '90vh',
  bgcolor: '#F2F2F7',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  overflowY: 'auto',
};

function ReturnPolicy({ sx }: { sx?: SxProps }): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={sx}>
      <Button variant="text" onClick={handleOpen} sx={{ color: "primary.main", textTransform: 'none', fontWeight: 500 }}>
        View Return Policy
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="return-policy-title"
        aria-describedby="return-policy-description"
        closeAfterTransition
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="return-policy-title" variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Return, Refund & Cancellation Policy
          </Typography>
          <Typography id="return-policy-description" variant="body1" sx={{ mb: 2 }}>
            <strong>All Sales Are Final:</strong> Due to the proprietary and digital nature of the information and services we provide, 
            <u>all purchases are non-refundable, non-cancellable, and non-returnable</u>. By proceeding with your purchase, you acknowledge and agree that you have been clearly informed of this policy prior to completing your transaction.
            <br />
            <br />
            <strong>No Refunds, Cancellations, or Returns:</strong> Once an order is placed and payment is processed, you will not be eligible for any refund, return, or cancellation, in whole or in part, for any reason, including but not limited to dissatisfaction with the product or service, accidental purchase, or change of mind.
            <br />
            <br />
            <strong>Legal Notice:</strong> This policy is provided in accordance with applicable law and is intended to be fully binding and enforceable. By making a purchase, you expressly waive any right to dispute charges, request a refund, or initiate a chargeback for any reason. If you do not agree with this policy, please do not proceed with your purchase. 
            <br />
            <br />
            If you have any questions regarding this policy, please contact us before making a purchase.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export {ReturnPolicy};