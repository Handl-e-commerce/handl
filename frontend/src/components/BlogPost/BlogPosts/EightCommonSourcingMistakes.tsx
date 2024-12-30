import { Typography, Divider, List, ListItem, Link, Box, ListItemText } from "@mui/material";

export const EightCommonSourcingMistakes = (
    <Box sx={{ paddingX: '4%', textAlign: "left" }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Why Sourcing Mistakes Can Be Costly
        </Typography>
        <Typography>
          Sourcing products at the right price and quality is vital for any growing business. Yet, even experienced entrepreneurs fall into pitfalls that lead to lost time, added expenses, and damaged reputations. Whether you’re running an e-commerce store or a brick-and-mortar shop, understanding common sourcing mistakes can help you dodge them—and set your business up for long-term success.
        </Typography>
      </Box>

      <List>
        {["1. Relying on Unverified Suppliers", "2. Overlooking Quality Control", "3. Failing to Negotiate Payment Terms", "4. Not Factoring in Hidden Costs", "5. Miscommunicating Product Specs", "6. Skipping Proper Lead Time Estimates", "7. Ignoring Supplier Relationships", "8. Not Leveraging Tech Tools"].map((mistake, index) => (
          <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              {mistake.split('.')[0]} {mistake.split('.')[1]}
            </Typography>
            <ListItemText
              primary={mistake.includes("Relying") ? (
                <>
                  Jumping into deals with unverified suppliers or distributors can lead to late shipments, low-quality products, or even financial fraud. Avoid it by using verified platforms like{' '}
                  <Link href="https://thehandl.com" target="_blank">Handl</Link>, checking references, and verifying business credentials.
                </>
              ) : mistake.includes("Quality Control") ? (
                <>
                  Ensure consistency by requesting multiple samples, establishing quality standards, and conducting regular inspections.
                </>
              ) : mistake.includes("Negotiating Payment") ? (
                <>
                  Start small, propose flexible terms like 30- or 60-day payment windows, and consider milestone payments.
                </>
              ) : mistake.includes("Hidden Costs") ? (
                <>
                  Get a full cost breakdown, use freight forwarders, and set a budget cushion for unexpected costs.
                </>
              ) : mistake.includes("Product Specs") ? (
                <>
                  Be specific with dimensions, materials, and certifications. Document changes and use collaborative tools for clarity.
                </>
              ) : mistake.includes("Lead Time") ? (
                <>
                  Build a timeline factoring production, shipping, and customs. Use supply chain software for accuracy.
                </>
              ) : mistake.includes("Supplier Relationships") ? (
                <>
                  Treat suppliers as partners. Communicate regularly, provide feedback, and show appreciation to build loyalty.
                </>
              ) : (
                <>
                  Leverage collaborative platforms like <Link href="https://thehandl.com" target="_blank">Handl</Link>, adopt inventory management systems, and centralize communication.
                </>
              )}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" component="h2" gutterBottom>
        Conclusion
      </Typography>
      <Typography>
        Sourcing mistakes are common, but they don’t have to derail your business. By verifying suppliers, setting clear expectations, negotiating smartly, and leveraging technology, you can streamline your sourcing process and avoid costly pitfalls. Ready to connect with trustworthy wholesalers and distributors? Visit{' '}
        <Link href="https://thehandl.com" target="_blank">Handl</Link> to explore verified options and build better supplier relationships today.
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Got questions or tips of your own? Share them in the comments or join our thriving community at{' '}
        <Link href="https://www.reddit.com/r/handl/" target="_blank">r/handl</Link>. We’d love to learn from your experiences and help you master the art of sourcing!
      </Typography>
    </Box>
);