import { Box } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as { statusText: string, message: string };
  console.error(error);

  return (
    <Box id="error-page" sx={{height: '65rem', flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Box>
  );
};

export { ErrorPage };