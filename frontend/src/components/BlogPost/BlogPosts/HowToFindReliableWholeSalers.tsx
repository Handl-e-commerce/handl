import { Typography, Link, Box } from "@mui/material";
import {styles} from './styles';

export const HowToFindReliableWholesalers = (
    <Box sx={{ paddingX: '5%', textAlign: 'left', fontSize: '18px !important' }}>
      <Typography variant="h4" component="h2" sx={styles.subheading}>
        Why Finding Reliable Wholesalers Is Crucial
      </Typography>

      <Typography>
        Sourcing <strong>reliable wholesalers</strong> is a game-changer for any business looking to expand product lines, maintain quality, and ultimately generate more profit. However, finding trustworthy <strong>wholesale partners</strong> can be tricky—fake leads, hidden fees, and unreliable service are all too common. By focusing on <strong>supplier verification</strong>, you can save time, reduce stress, and ensure a steady flow of high-quality products to your customers.
      </Typography>

      <Typography variant="h4" component="h2" sx={styles.subheading}>
        Key Benefits of Working with Reputable Wholesalers
      </Typography>

      <Typography marginBlock={.5}>Consistent product quality</Typography>
      <Typography marginBlock={.5}>Potential for bulk discounts and better margins</Typography>
      <Typography marginBlock={.5}>Long-term partnership opportunities</Typography>
      <Typography>Less risk of delays and product shortages</Typography>

      <Typography variant="h4" component="h2" sx={styles.subheading}>
        1. Define Your Wholesale Needs
      </Typography>

      <Typography margin={0}>
        Before you start your search, get clear on what you want to achieve by partnering with a <strong>wholesale supplier</strong>.
      </Typography>

      <Typography variant="h6" component="h3" sx={styles.pointHeading}>
        Product Category
      </Typography>
      <Typography>
        Are you sourcing consumer electronics, fashion items, or specialty goods?
      </Typography>      
      <Typography variant="h6" component="h3" sx={styles.pointHeading}>
        Quality Standards
      </Typography>
      <Typography>
        Determine if you need premium-grade products or more budget-friendly options.
      </Typography>
      <Typography variant="h6" component="h3" sx={styles.pointHeading}>
        Quantity and Budget
      </Typography>
      <Typography>
        Be realistic about how much inventory you need and how much you can invest upfront.
      </Typography>

      <Typography marginTop={'8px'}>
        <em>Pro Tip:</em> This clarity helps you filter out wholesalers that don’t match your business model, making your search more efficient.
      </Typography>

      <Typography variant="h4" component="h2" sx={styles.subheading}>
        2. Conduct Thorough Research
      </Typography>

      <Typography>
        A quick online search might reveal a few leads, but don’t stop there. Dig deeper to find <strong style={{ margin: '0 .25rem'}}>legitimate wholesalers</strong> who meet your exact requirements.
      </Typography>

      <Typography variant="h6" component="h3" sx={styles.pointHeading}>
        Use Online Directories and Platforms
      </Typography>
      <Typography>
        <Link href="https://thehandl.com" target="_blank" rel="noopener" color='#3C8DBC' fontWeight={600}>Handl</Link>
        : A curated network of <strong style={{ margin: '0 .25rem'}}>verified wholesalers</strong> and distributors, designed to save you time and money.
      </Typography>
      <Typography>
        <strong style={{marginRight: '.25rem'}}>Industry-Specific Directories:</strong>Search for wholesalers specializing in your product niche.
      </Typography>

      <Typography variant="h6" component="h3" sx={styles.pointHeading}>
        Attend Trade Shows and Events
      </Typography>
      <Typography>
        Trade shows provide face-to-face interactions with potential <strong>wholesale suppliers</strong>. You can inspect products firsthand and build personal connections.
      </Typography>

      <Typography variant="h6" component="h3" sx={styles.pointHeading}>
        Check Reviews & Testimonials
      </Typography>
      <Typography>
        Browse online forums or visit 
        <Link href="https://www.reddit.com/r/handl/" target="_blank" rel="noopener" style={{margin: '0 .25rem'}} color='#3C8DBC'>
          r/handl on Reddit
        </Link> 
        to find real feedback from entrepreneurs who have worked with certain wholesalers.
      </Typography>

      <Typography variant="h4" component="h2" sx={styles.subheading}>
        3. Verification Is Key
      </Typography>

      <Typography>
        Once you’ve gathered a list of potential wholesalers, <strong>verify their credentials</strong> to ensure you’re partnering with legitimate businesses.
      </Typography>

      <Typography variant="h6" component="h3" sx={styles.pointHeading}>
        Request Business Licences
      </Typography>
      <Typography>
        A registered wholesaler should have valid documentation.
      </Typography>      
      <Typography variant="h6" component="h3" sx={styles.pointHeading}>
        Ask for Trade References
      </Typography>
      <Typography>
        Speaking with existing clients can reveal a lot about their reliability and product quality.
      </Typography>
      <Typography variant="h6" component="h3" sx={styles.pointHeading}>
        Review Their Online Presence
      </Typography>
      <Typography>
        Websites, social media profiles, and industry listings can provide insights into their reputation and professionalism.
      </Typography>

      <Typography variant="h6" component="h3" sx={{...styles.pointHeading, fontWeight: 700}}>
        Red Flags to Watch Out For
      </Typography>

      <Typography marginBlock={.5}>
        Lack of transparency regarding pricing or minimum order requirements
      </Typography>
      <Typography marginBlock={.5}>
          Poor or non-existent customer reviews
      </Typography>
      <Typography marginBlock={.5}>
        Limited contact information (e.g., only a generic email address)
      </Typography>

      <Typography variant="h4" component="h2" sx={styles.subheading}>
        Conclusion
      </Typography>

      <Typography paragraph>
        Finding <strong>reliable wholesalers</strong> doesn't have to be overwhelming. With a clear plan, thorough research, and the right tools, you can secure profitable partnerships that help your business grow. Whether you’re just starting or looking to expand your supplier network, remember to <strong>verify credentials, communicate openly, and start small</strong> to ensure the wholesaler truly meets your needs.
      </Typography>
      
      <Typography paragraph>
        Ready to simplify your sourcing process? Head over to 
        <Link href="https://thehandl.com" target="_blank" rel="noopener" style={{margin: '0 .25rem'}} color='#3C8DBC'>
          thehandl.com
        </Link> 
        and explore our <strong>verified supplier network</strong>. Don’t forget to join our community over at 
        <Link href="https://www.reddit.com/r/handl/" target="_blank" rel="noopener" style={{margin: '0 .25rem'}} color='#3C8DBC'>
          r/handl
        </Link> 
        for more tips, insights, and support from fellow entrepreneurs. Your next reliable wholesaler might be just a few clicks away!
      </Typography>
    </Box>
);