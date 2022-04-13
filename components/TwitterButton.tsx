import React from "react";
import Link from "./Link";
import { Twitter } from "@mui/icons-material";

export default function BackToTop() {
  return (
    <Link
      sx={{ color: "#1da1f2" }}
      target="_blank"
      href="https://twitter.com/FTM_To_The_Moon"
      aria-label="twitter link"
    >
      <Twitter />
    </Link>
  );
}
