import React from "react";

import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  counter: number;
  isValidating: boolean;
  mutate: () => void;
}

export default function RefreshButton({
  counter,
  isValidating,
  mutate,
}: Props) {
  return (
    <Box width="100%" display="flex" justifyContent="flex-end" color="gray">
      <LoadingButton
        sx={{
          textTransform: "none",
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
        }}
        loading={isValidating}
        disabled={isValidating}
        disableElevation
        disableRipple
        variant="text"
        color="inherit"
        onClick={() => mutate()}
      >
        Last updated: {counter}s ago
      </LoadingButton>
    </Box>
  );
}
