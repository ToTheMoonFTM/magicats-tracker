import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography my={1} variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MuiLink
        target="_blank"
        color="inherit"
        href="https://twitter.com/FTM_To_The_Moon"
      >
        ToTheMoon.FTM
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
