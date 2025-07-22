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
      <Button variant="text" onClick={handleOpen} sx={{ color: '#F2E5D1', textTransform: 'none', fontWeight: 400, fontSize: '1rem' }}>
        Return Policy
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
            <strong>All Sales Final:</strong> Due to the proprietary and digital nature of our product, all purchases are strictly non-refundable, non-cancellable, and non-returnable. By completing your purchase, you explicitly acknowledge and accept this policy.
            <br />
            <br />
            <strong>No Refunds, Returns, or Cancellations:</strong> Once your order is processed, you forfeit eligibility for refunds, returns, cancellations, or exchanges under any circumstances. This includes, but is not limited to, dissatisfaction with the content, accidental purchase, changes in your sourcing needs, or technical compatibility issues.
            <br />
            <br />
            <strong>Chargeback Policy:</strong> By purchasing our digital product, you expressly waive your right to dispute charges or initiate chargebacks with your financial institution. Any attempt to circumvent this policy via a chargeback will be considered a breach of our terms of service, and we reserve the right to seek legal recourse and reimbursement for all associated expenses.
            <br />
            <br />
            <strong>Legal Agreement:</strong> Your purchase constitutes a legally binding agreement that you fully understand and accept the terms outlined above. If you disagree with any part of this policy, do not complete your transaction.
            <br />
            <br />
            For questions or clarifications regarding this policy, please contact our support team before finalizing your purchase.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export {ReturnPolicy};