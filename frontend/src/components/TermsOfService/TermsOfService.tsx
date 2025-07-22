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

function TermsOfService({ sx }: { sx?: SxProps }): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={sx}>
      <Button variant="text" onClick={handleOpen} sx={{ color: '#F2E5D1', textTransform: 'none', fontWeight: 400, fontSize: '1rem' }}>
        Terms of Service
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="terms-of-service-title"
        aria-describedby="terms-of-service-description"
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
          <Typography id="terms-of-service-title" variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Terms of Service
          </Typography>
          <Typography id="terms-of-service-description" variant="body1" sx={{ mb: 2 }}>
            <strong>1. Introduction</strong>
            <br />
            Welcome to handl. By accessing or using our website and services, you agree to abide by these Terms of Service. If you disagree with any part of these terms, you must not use our website.
            <br />
            <br />
            <strong>2. Service Description</strong>
            <br />
            handl provides a digital B2B directory designed to connect buyers with manufacturers, distributors, wholesalers, and retailers. The service includes access to vendor data, sourcing tools, and contact information through a premium subscription.
            <br />
            <br />
            <strong>3. User Eligibility</strong>
            <br />
            Users must be at least 18 years old and possess the legal authority to enter binding contracts. By using our services, you affirm that you meet these eligibility requirements.
            <br />
            <br />
            <strong>4. Subscription and Payment</strong>
            <br />
            Access to premium features requires payment of a one-time annual subscription fee. All payments are non-refundable, non-transferable, and subject to our Return Policy.
            <br />
            <br />
            <strong>5. Disclaimer of Liability</strong>
            <br />
            handl is a directory service and explicitly does not endorse, recommend, or guarantee any listed vendors or suppliers. We are not responsible for the accuracy, quality, legality, or reliability of products or services offered by listed vendors. Users must independently verify vendor credentials and perform due diligence before entering into transactions.
            <br />
            <br />
            <strong>6. No Guarantee</strong>
            <br />
            handl does not guarantee successful business outcomes from connections made through our platform. All interactions and transactions between users and listed vendors are solely at the users' own risk.
            <br />
            <br />
            <strong>7. Indemnification</strong>
            <br />
            Users agree to indemnify and hold handl harmless from any claims, damages, liabilities, and expenses arising from disputes or interactions with vendors listed on our platform.
            <br />
            <br />
            <strong>8. Intellectual Property</strong>
            <br />
            All content on the handl website, including text, graphics, logos, and software, is the exclusive property of handl and protected by applicable intellectual property laws. Unauthorized use or reproduction is strictly prohibited.
            <br />
            <br />
            <strong>9. User Conduct</strong>
            <br />
            You agree not to misuse the website, engage in fraudulent activities, or attempt unauthorized access to vendor or user information.
            <br />
            <br />
            <strong>10. Termination</strong>
            <br />
            handl reserves the right to terminate user access at any time without prior notice if we determine a breach of these Terms of Service has occurred.
            <br />
            <br />
            <strong>11. Governing Law</strong>
            <br />
            These Terms of Service are governed by the laws of the State of Delaware, without regard to conflicts of laws principles.
            <br />
            <br />
            <strong>12. Dispute Resolution</strong>
            <br />
            Any disputes arising from these terms shall be resolved through arbitration conducted in Delaware, and users waive their right to participate in class-action lawsuits.
            <br />
            <br />
            <strong>13. Changes to Terms</strong>
            <br />
            handl reserves the right to modify these Terms at any time. Users will be notified of material changes, and continued use constitutes acceptance of the new terms.
            <br />
            <br />
            <strong>Contact Information</strong>
            <br />
            For questions or clarifications regarding these Terms of Service, please contact us directly.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export {TermsOfService};
