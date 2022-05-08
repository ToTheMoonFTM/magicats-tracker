import React from "react";

import { GitHub } from "@mui/icons-material";

import Link from "./Link";

export default function GithubButton() {
  return (
    <Link
      sx={{
        color: "#000000",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
      target="_blank"
      href="https://github.com/ToTheMoonFTM/magicats-tracker"
      aria-label="github link"
    >
      <GitHub fontSize="large" />
    </Link>
  );
}
