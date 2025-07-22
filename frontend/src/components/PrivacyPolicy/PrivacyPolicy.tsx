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

function PrivacyPolicy({ sx }: { sx?: SxProps }): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box sx={sx}>
      <Button variant="text" onClick={handleOpen} sx={{ color: '#F2E5D1', textTransform: 'none', fontWeight: 400, fontSize: '1rem' }}>
        Privacy Policy
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="privacy-policy-title"
        aria-describedby="privacy-policy-description"
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
          <Typography id="privacy-policy-title" variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Privacy Policy
          </Typography>
          <Box id="privacy-policy-description" sx={{ mb: 2, textAlign: 'left' }}>
            <Typography variant="body1" paragraph>
              <strong>Last Updated:</strong> January 8, 2025
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to <strong>thehandl.com</strong> ("Handl," "we," "us," or "our"). We value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and disclose your information when you visit or use our website and any related services (collectively, the "Services").
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              1. Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
              We may collect the following types of information:
            </Typography>
            
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Personal Information:
            </Typography>
            <ul>
              <li>Name, email address, phone number, shipping/billing address, and any other contact details you provide when you sign up or engage with our Services.</li>
              <li>Payment information (such as credit card details), but please note that we typically use a third-party payment processor and do not store your full payment card details ourselves.</li>
            </ul>
            
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              Business Information:
            </Typography>
            <ul>
              <li>Company name, type of business, and relevant details if you use our Services to source or supply products.</li>
            </ul>
            
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              Usage Information:
            </Typography>
            <ul>
              <li>IP address, browser type, device information, and pages visited on thehandl.com.</li>
              <li>Cookies and similar tracking technologies that help us understand your preferences and improve user experience.</li>
            </ul>
            
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              Communications:
            </Typography>
            <ul>
              <li>The content of your communications with us, including customer support inquiries, emails, or messages you send via our platforms.</li>
            </ul>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              2. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We use your information to:
            </Typography>
            
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Provide and Maintain Services:
            </Typography>
            <ul>
              <li>Process transactions, facilitate supplier/retailer connections, and deliver related customer support.</li>
            </ul>
            
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              Personalize User Experience:
            </Typography>
            <ul>
              <li>Tailor content and recommendations based on your preferences and past interactions.</li>
            </ul>
            
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              Improve Our Services:
            </Typography>
            <ul>
              <li>Analyze usage patterns, troubleshoot issues, and enhance the functionality of our website.</li>
            </ul>
            
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              Communicate With You:
            </Typography>
            <ul>
              <li>Send updates, promotional content, and important notices (e.g., changes to this Privacy Policy).</li>
            </ul>
            
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              Protect Our Platform and Users:
            </Typography>
            <ul>
              <li>Detect and prevent fraudulent activity, unauthorized access, or other security issues.</li>
            </ul>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              3. How We Share Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We may share your information in the following ways:
            </Typography>
            
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              With Third-Party Service Providers:
            </Typography>
            <ul>
              <li>Payment processors, analytics providers, and other vendors that help us operate our business.</li>
            </ul>
            
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              With Business Partners and Suppliers:
            </Typography>
            <ul>
              <li>If you choose to connect with suppliers or retailers through Handl, we may share relevant information needed to facilitate those interactions.</li>
            </ul>
            
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              Legal and Compliance:
            </Typography>
            <ul>
              <li>If required by law, regulation, or legal process (e.g., in response to a court order or subpoena), or if necessary to protect our rights and property or the rights of others.</li>
            </ul>
            
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              Corporate Transactions:
            </Typography>
            <ul>
              <li>In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
            </ul>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              4. Cookies and Tracking Technologies
            </Typography>
            <Typography variant="body1" paragraph>
              We use <strong>cookies</strong> and similar technologies to:
            </Typography>
            <ul>
              <li>Remember your preferences and settings.</li>
              <li>Analyze site usage and improve our Services.</li>
              <li>Provide relevant advertising when permitted.</li>
            </ul>
            <Typography variant="body1" paragraph>
              You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect certain features of our website.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              5. Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We take reasonable measures to protect your personal information from unauthorized access, loss, misuse, or alteration. While we strive to use commercially acceptable means to safeguard your data, no method of electronic storage or transmission is 100% secure. You are responsible for keeping your account login credentials safe.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              6. International Data Transfers
            </Typography>
            <Typography variant="body1" paragraph>
              If you access our Services from outside the country where our servers are located, your information may be transferred to, stored, or processed in a different jurisdiction. By using our Services, you consent to any such transfer of your information, which may be subject to different data protection laws than your country of residence.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              7. Children's Privacy
            </Typography>
            <Typography variant="body1" paragraph>
              Our Services are not intended for individuals under the age of 13 (or the applicable age of majority in your jurisdiction). We do not knowingly collect personal information from children. If we learn that we have inadvertently gathered personal data from a child, we will take steps to delete it as soon as possible.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              8. Third-Party Links
            </Typography>
            <Typography variant="body1" paragraph>
              Our website may contain links to other sites not operated by Handl. This Privacy Policy applies only to the Services we provide. We are not responsible for the content, privacy policies, or practices of any third-party websites.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              9. Your Choices and Rights
            </Typography>
            <Typography variant="body1" paragraph>
              Depending on your location, you may have certain rights regarding your personal information, including the right to:
            </Typography>
            <Typography variant="body1"><strong>Access and Update:</strong> The personal information we hold about you.</Typography>
            <Typography variant="body1"><strong>Delete:</strong> Your personal information or request that we erase it, subject to certain exceptions.</Typography>
            <Typography variant="body1"><strong>Opt Out:</strong> Of certain data processing activities, such as receiving marketing emails or targeted advertising.</Typography>
            <Typography variant="body1" paragraph><strong>Withdraw Consent:</strong> Where consent is the lawful basis of our data processing.</Typography>
            <Typography variant="body1" paragraph>
              To exercise any of these rights or for more information, please contact us at the email address below.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              10. Changes to This Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. When we do, we will revise the "Last Updated" date at the top of this page. We encourage you to review this Privacy Policy periodically.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              11. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to us at <span style={{color: '#3C8DBC'}}>support@thehandl.com</span>
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export {PrivacyPolicy};
