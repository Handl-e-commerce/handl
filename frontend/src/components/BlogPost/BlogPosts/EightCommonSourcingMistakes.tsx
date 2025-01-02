import { Typography, Link, Box } from "@mui/material";
import { styles } from "./styles";

const mistakeTitles = [
  <Typography variant="h4" component="h2" sx={styles.subheading}>
    1. Relying on Unverified Suppliers
  </Typography>,
  <Typography variant="h4" component="h2" sx={styles.subheading}>
    2. Overlooking Quality Control
  </Typography>,
  <Typography variant="h4" component="h2" sx={styles.subheading}>
    3. Failing to Negotiate Payment Terms
  </Typography>,
  <Typography variant="h4" component="h2" sx={styles.subheading}>
    4. Not Factoring in Hidden Costs
  </Typography>,
  <Typography variant="h4" component="h2" sx={styles.subheading}>
    5. Miscommunicating Product Specs
  </Typography>,
  <Typography variant="h4" component="h2" sx={styles.subheading}>
    6. Skipping Proper Lead Time Estimates
  </Typography>,
  <Typography variant="h4" component="h2" sx={styles.subheading}>
    7. Ignoring Supplier Relationships
  </Typography>,
  <Typography variant="h4" component="h2" sx={styles.subheading}>
    8. Not Leveraging Tech Tools
  </Typography>,
];

const mistakes = [
  <>
    Jumping into deals with unverified suppliers or distributors can lead to late shipments, low-quality products, or even financial fraud. Avoid it by using verified platforms like{' '}
    <Link href="https://thehandl.com" target="_blank">Handl</Link>, checking references, and verifying business credentials.
  </>,
  <>
    Ensure consistency by requesting multiple samples, establishing quality standards, and conducting regular inspections.
  </>,
  <>
    Start small, propose flexible terms like 30- or 60-day payment windows, and consider milestone payments.
  </>,
  <>
    Get a full cost breakdown, use freight forwarders, and set a budget cushion for unexpected costs.
  </>,
  <>
    Be specific with dimensions, materials, and certifications. Document changes and use collaborative tools for clarity.
  </>,
  <>
    Build a timeline factoring production, shipping, and customs. Use supply chain software for accuracy.
  </>,
  <>
    Treat suppliers as partners. Communicate regularly, provide feedback, and show appreciation to build loyalty.
  </>,
  <>
    Leverage collaborative platforms like <Link href="https://thehandl.com" target="_blank">Handl</Link>, adopt inventory management systems, and centralize communication.
  </>,
];

const renderMistakes = (): JSX.Element[] => {
  const elements: JSX.Element[] = [];
  for (let i = 0; i < mistakeTitles.length; i++) {
    elements.push(
      <Box key={i}>
        {mistakeTitles[i]}
        {mistakes[i]}
      </Box>
    );
  }
  return elements;
}

export const EightCommonSourcingMistakes = (
  <Box sx={{ paddingX: '4%', textAlign: "left" }}>
    <Box aria-label="Introduction">
      <Typography variant="h4" component="h2" sx={styles.subheading}>
        Why Sourcing Mistakes Can Be Costly
      </Typography>
      <Typography variant="body1">
        Sourcing products at the right price and quality is vital for any growing business. Yet, even experienced entrepreneurs fall into pitfalls that lead to lost time, added expenses, and damaged reputations. Whether you’re running an e-commerce store or a brick-and-mortar shop, understanding common sourcing mistakes can help you dodge them—and set your business up for long-term success.
      </Typography>
    </Box>
    {renderMistakes()}
    <Box aria-label="Conclusion">
      <Typography variant="h4" component="h2" sx={styles.subheading}>
        Conclusion
      </Typography>
      <Typography paragraph>
        Sourcing mistakes are common, but they don’t have to derail your business. By verifying suppliers, setting clear expectations, negotiating smartly, and leveraging technology, you can streamline your sourcing process and avoid costly pitfalls. Ready to connect with trustworthy wholesalers and distributors? Visit{' '}
        <Link href="https://thehandl.com" target="_blank">Handl</Link> to explore verified options and build better supplier relationships today.            
      </Typography>
      <Typography paragraph>
        Got questions or tips of your own? Share them in the comments or join our thriving community at{' '}
        <Link href="https://www.reddit.com/r/handl/" target="_blank">r/handl</Link>. We’d love to learn from your experiences and help you master the art of sourcing!
      </Typography>
    </Box>
  </Box>
);