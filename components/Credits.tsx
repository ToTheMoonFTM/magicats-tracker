import React from "react";

import { Box, Paper, Typography } from "@mui/material";

import Link from "./Link";

export default function Credits() {
  return (
    <Box
      component={Paper}
      mt={1}
      mb={3}
      p={3}
      display="flex"
      flexDirection="column"
      variant="outlined"
    >
      <Typography>Credits:</Typography>
      <ul>
        <li>
          <Typography>
            <Link
              target="_blank"
              href="https://spooky.fi/#/magicats"
              underline="hover"
            >
              SpookySwap
            </Link>
          </Typography>
        </li>
        <li>
          <Typography>
            <Link
              target="_blank"
              href="https://paintswap.finance/marketplace/collections/0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9"
              underline="hover"
            >
              PaintSwap
            </Link>
          </Typography>
        </li>
        <li>
          <Typography>
            <Link
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/1NS1VFfALpGe9anjCJNaNFXZXTxnvUcq1EbSIU_psSsQ/edit#gid=789621007&fvid=710219763"
              underline="hover"
            >
              Magicats Rarity Data Sheet
            </Link>{" "}
            by King (Mod from SpookySwap)
          </Typography>
        </li>
      </ul>
    </Box>
  );
}
