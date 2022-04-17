import React, { PropsWithChildren } from "react";
import dynamic from "next/dynamic";

import { Box, Container, NoSsr, Skeleton, Typography } from "@mui/material";

const TwitterButton = dynamic(() => import("../components/TwitterButton"), {
  ssr: false,
});

interface Props {
  title: string;
}

export default function MainContainer({
  title,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <NoSsr
          fallback={
            <Box display="flex" flexDirection="row" alignItems="center" my={1}>
              <Skeleton variant="circular" width={24} height={24} />
              <Box mr={1} />
              <Skeleton width={150} height={24} />
            </Box>
          }
        >
          <Box height={24} my={1}>
            <TwitterButton />
          </Box>
        </NoSsr>
        {children}
      </Box>
    </Container>
  );
}
