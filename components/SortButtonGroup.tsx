import React from "react";

import { Box, Button } from "@mui/material";

import { SortMode } from "../utils/sortFunctionByMode";

interface Props {
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
}

export default function SortButtonGroup({ sortMode, setSortMode }: Props) {
  return (
    <Box display="flex" mb={2}>
      <Box mx={1} display="flex" alignItems="stretch">
        <Button
          variant={sortMode === "price" ? "contained" : "outlined"}
          onClick={() => setSortMode("price")}
        >
          Sort By Lowest Price
        </Button>
      </Box>
      <Box mx={1} display="flex" alignItems="stretch">
        <Button
          variant={sortMode === "ratio" ? "contained" : "outlined"}
          onClick={() => setSortMode("ratio")}
        >
          Sort By Highest MP / FTM Ratio
        </Button>
      </Box>
    </Box>
  );
}
