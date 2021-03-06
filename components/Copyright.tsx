import React from "react";

import { Link as MuiLink, Typography } from "@mui/material";

export default function Copyright() {
  return (
    <Typography my={1} variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MuiLink
        target="_blank"
        color="inherit"
        href="https://twitter.com/TTM_FTM"
      >
        TTM.FTM
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
