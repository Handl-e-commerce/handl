import { Box, Dialog, DialogTitle, Divider, List, ListItem, Typography } from "@mui/material";

interface IPrivacyPolicyProps {
    open: boolean;
    onClose: (value: string) => void;
}



function PrivacyPolicy({ open, onClose }: IPrivacyPolicyProps): JSX.Element {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            sx={{
                textAlign: 'center'
            }}
        >
            <DialogTitle>
                Privacy Policy
                <Divider />
            </DialogTitle>
            <Box padding={'4%'}>
                <Typography paragraph><b>Last Updated:</b> January 8, 2025</Typography>
                <Typography paragraph>
                    Welcome to <b>thehandl.com</b> (“Handl,” “we,” “us,” or “our”). We value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and disclose your information when you visit or use our website and any related services (collectively, the “Services”).
                </Typography>
                
                <Divider sx={{ marginY: '3px'}}/>

                <Box aria-label="Information We Collect">
                    <Typography variant="h6">
                        1. Information We Collect
                    </Typography>
                    <Typography paragraph>We may collect the following types of information:</Typography>

                    <Typography textAlign={'left'} fontWeight={500}>Personal Information:</Typography>
                    <List>
                        <ListItem>
                            Name, email address, phone number, shipping/billing address, and any other contact details you provide when you sign up or engage with our Services.
                        </ListItem>
                        <ListItem>
                            Payment information (such as credit card details), but please note that we typically use a third-party payment processor and do not store your full payment card details ourselves.
                        </ListItem>
                    </List>
                    
                    <Typography textAlign={'left'} fontWeight={500}>Business Information:</Typography>
                    <List>
                        <ListItem>
                            Company name, type of business, and relevant details if you use our Services to source or supply products.
                        </ListItem>
                    </List>
                    
                    <Typography textAlign={'left'} fontWeight={500}>Usage Information:</Typography>
                    <List>
                        <ListItem>
                            IP address, browser type, device information, and pages visited on thehandl.com.
                        </ListItem>
                        <ListItem>
                            Cookies and similar tracking technologies that help us understand your preferences and improve user experience.
                        </ListItem>
                    </List>
                    
                    <Typography textAlign={'left'} fontWeight={500}>Communications:</Typography>
                    <List>
                        <ListItem>
                            The content of your communications with us, including customer support inquiries, emails, or messages you send via our platforms.
                        </ListItem>
                    </List>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>

                <Box aria-label="How We User Your Information">
                    <Typography variant="h6">
                        2. How We Use Your Information
                    </Typography>
                    <Typography paragraph>We use your information to:</Typography>
                    
                    <Typography textAlign={'left'} fontWeight={500}>Provide and Maintain Services:</Typography>
                    <List>
                        <ListItem>
                            Process transactions, facilitate supplier/retailer connections, and deliver related customer support.
                        </ListItem>
                    </List>
                   
                    <Typography textAlign={'left'} fontWeight={500}>Personalize User Experience:</Typography>
                    <List>
                        <ListItem>
                            Tailor content and recommendations based on your preferences and past interactions.
                        </ListItem>
                    </List>
                   
                    <Typography textAlign={'left'} fontWeight={500}>Improve Our Services:</Typography>
                    <List>
                        <ListItem>
                            Analyze usage patterns, troubleshoot issues, and enhance the functionality of our website.
                        </ListItem>
                    </List>
                    
                    <Typography textAlign={'left'} fontWeight={500}>Communicate With You:</Typography>
                    <List>
                        <ListItem>
                            Send updates, promotional content, and important notices (e.g., changes to this Privacy Policy).  
                        </ListItem>
                    </List>
                    
                    <Typography textAlign={'left'} fontWeight={500}>Protect Our Platform and Users:</Typography>
                    <List>
                        <ListItem>
                            Detect and prevent fraudulent activity, unauthorized access, or other security issues.
                        </ListItem>
                    </List>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>

                <Box aria-label="How We Share Your Information">
                    <Typography variant="h6">
                        3. How We Share Your Information
                    </Typography>
                    <Typography paragraph>We may share your information in the following ways:</Typography>
                    <Typography textAlign={'left'} fontWeight={500}>With Third-Party Service Providers:</Typography>
                    <List>
                        <ListItem>
                            Payment processors, analytics providers, and other vendors that help us operate our business.
                        </ListItem>
                    </List>
                   
                    <Typography textAlign={'left'} fontWeight={500}>With Business Partners and Suppliers:</Typography>
                    <List>
                        <ListItem>
                            If you choose to connect with suppliers or retailers through Handl, we may share relevant information needed to facilitate those interactions.
                        </ListItem>
                    </List>
                    
                    <Typography textAlign={'left'} fontWeight={500}>Legal and Compliance:</Typography>
                    <List>
                        <ListItem>
                            If required by law, regulation, or legal process (e.g., in response to a court order or subpoena), or if necessary to protect our rights and property or the rights of others.
                        </ListItem>
                    </List>
                    
                    <Typography textAlign={'left'} fontWeight={500}>Corporate Transactions:</Typography>
                    <List>
                        <ListItem>
                        In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
                        </ListItem>
                    </List>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>

                <Box aria-label="Cookies and Tracking Technologies">
                    <Typography variant="h6">
                        4. Cookies and Tracking Technologies
                    </Typography>
                    <Typography>We use <b>cookies</b> and similar technologies to:</Typography>
                    <List>
                        <ListItem>Remember your preferences and settings.</ListItem>
                        <ListItem>Analyze site usage and improve our Services.</ListItem>
                        <ListItem>Provide relevant advertising when permitted.</ListItem>
                    </List>
                    <Typography paragraph>You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect certain features of our website.</Typography>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>

                <Box aria-label="Data Security">
                    <Typography variant="h6">
                        5. Data Security
                    </Typography>
                    <Typography paragraph>
                        We take reasonable measures to protect your personal information from unauthorized access, loss, misuse, or alteration. While we strive to use commercially acceptable means to safeguard your data, no method of electronic storage or transmission is 100% secure. You are responsible for keeping your account login credentials safe.
                    </Typography>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>

                <Box aria-label="International Data Transfers">
                    <Typography variant="h6">
                        6. International Data Transfers
                    </Typography>
                    <Typography paragraph>
                        If you access our Services from outside the country where our servers are located, your information may be transferred to, stored, or processed in a different jurisdiction. By using our Services, you consent to any such transfer of your information, which may be subject to different data protection laws than your country of residence.
                    </Typography>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>

                <Box aria-label="Children's Privacy">
                    <Typography variant="h6">
                        7. Children's Privacy
                    </Typography>
                    <Typography paragraph>
                        Our Services are not intended for individuals under the age of 13 (or the applicable age of majority in your jurisdiction). We do not knowingly collect personal information from children. If we learn that we have inadvertently gathered personal data from a child, we will take steps to delete it as soon as possible.
                    </Typography>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>

                <Box aria-label="Third-Party Links">
                    <Typography variant="h6">
                        8. Third-Party Links
                    </Typography>
                    <Typography paragraph>
                        Our website may contain links to other sites not operated by Handl. This Privacy Policy applies only to the Services we provide. We are not responsible for the content, privacy policies, or practices of any third-party websites.
                    </Typography>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>
                
                <Box aria-label="Your Choices and Rights">
                    <Typography variant="h6">
                        9. Your Choices and Rights
                    </Typography>
                    <Typography paragraph>
                        Depending on your location, you may have certain rights regarding your personal information, including the right to:
                    </Typography>
                    <Typography textAlign={'left'}><b>Access and Update:</b> The personal information we hold about you.</Typography>
                    <Typography textAlign={'left'}><b>Delete:</b> Your personal information or request that we erase it, subject to certain exceptions.</Typography>
                    <Typography textAlign={'left'}><b>Opt Out:</b> Of certain data processing activities, such as receiving marketing emails or targeted advertising.</Typography>
                    <Typography textAlign={'left'}><b>Withdraw Consent:</b> Where consent is the lawful basis of our data processing.</Typography>

                    <Typography paragraph>To exercise any of these rights or for more information, please contact us at the email address below.</Typography>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>

                <Box aria-label="Changes to This Policy">
                    <Typography variant="h6">
                        10. Changes to This Policy
                    </Typography>
                    <Typography paragraph>
                        We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. When we do, we will revise the “Last Updated” date at the top of this page. We encourage you to review this Privacy Policy periodically.
                    </Typography>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>

                <Box aria-label="Contact Us">
                    <Typography variant="h6">
                        11. Contact Us
                    </Typography>
                    <Typography paragraph>
                        If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to us at <span style={{color: '#3C8DBC'}}>support@thehandl.com</span>
                    </Typography>
                </Box>
                
                <Divider sx={{ marginY: '3px'}}/>

            </Box>
        </Dialog>
    );
};

export {PrivacyPolicy};