import React from "react";
import { Box } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as { statusText: string, message: string };
  console.error(error);

  return (
    <Box id="error-page" sx={{height: '65rem', flexDirection: 'column', display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '10vh'}}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      {error && <pre style={{ color: 'gray' }}>{error.statusText || error.message}</pre>}
      <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Go to Home
      </Link>
    </Box>
  );
};

export { ErrorPage };