import React from "react";

import { Twitter } from "@mui/icons-material";

import Link from "./Link";

export default function BackToTop() {
  return (
    <Link
      sx={{
        color: "#1da1f2",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
      target="_blank"
      href="https://twitter.com/FTM_To_The_Moon"
      aria-label="twitter link"
    >
      <Twitter /> @FTM_To_The_Moon
    </Link>
  );
}
