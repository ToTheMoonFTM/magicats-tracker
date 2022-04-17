import React, { useEffect, useState } from "react";

import { Box, Fab } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

export default function BackToTop() {
  const [scrollY, setScrollY] = useState(0);

  const updateScrollY = () => setScrollY(window.scrollY);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  useEffect(() => {
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY);
  }, []);

  return scrollY > window.innerHeight / 2 ? (
    <Box
      position="fixed"
      right={{ xs: 12, sm: 24, md: 36 }}
      bottom={{ xs: 12, sm: 24, md: 36 }}
    >
      <Fab
        color="primary"
        size="large"
        aria-label="back to top"
        onClick={scrollToTop}
      >
        <ArrowUpward />
      </Fab>
    </Box>
  ) : null;
}
