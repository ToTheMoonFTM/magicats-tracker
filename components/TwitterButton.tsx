import React from "react";

import { Twitter } from "@mui/icons-material";

import Link from "./Link";

export default function TwitterButton() {
  return (
    <Link
      sx={{
        color: "#1da1f2",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
      target="_blank"
      href="https://twitter.com/TTM_FTM"
      aria-label="twitter link"
    >
      <Twitter fontSize="large" />
    </Link>
  );
}
