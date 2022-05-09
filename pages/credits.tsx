import React, { useEffect, useState } from "react";

import Copyright from "../components/Copyright";
import MainContainer from "../components/MainContainer";
import CreditsComponent from "../components/Credits";
import { Tooltip, Typography } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

const Credits = () => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText("0xF6Ae5D014AcC7ef79711afBDc02504Cc448394cE");
    setCopied(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (copied) {
      timeout = setTimeout(() => setCopied(false), 2000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [copied]);

  return (
    <MainContainer title="Credits">
      <CreditsComponent />
      <Typography>
        If you love my work and would like to tip me a coffee, here is my
        donation address:
      </Typography>
      <Tooltip
        title={copied ? "Address copied!" : "Copy"}
        followCursor
        enterDelay={200}
      >
        <Typography
          sx={{
            backgroundColor: "gainsboro",
            borderRadius: 12,
            my: 2,
            py: 0.5,
            px: 2,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
          fontSize={{ xs: "small", sm: "medium" }}
          onClick={copyAddress}
        >
          0xF6Ae5D014AcC7ef79711afBDc02504Cc448394cE
          <ContentCopy fontSize="small" sx={{ ml: 1 }} />
        </Typography>
      </Tooltip>
      <Copyright />
    </MainContainer>
  );
};

export default Credits;
