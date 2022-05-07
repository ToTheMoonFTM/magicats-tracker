import React, { PropsWithChildren } from "react";
import dynamic from "next/dynamic";

import {
  AppBar,
  Avatar,
  Box,
  Container,
  NoSsr,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "./Link";
import { Celebration, History, Home } from "@mui/icons-material";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link href="/">
              <Box display="flex" alignItems="center">
                <Box mr={1}>
                  <Avatar alt="mascot cat" src="/static/mascot-cat.png" />
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  {title}
                </Typography>
              </Box>
            </Link>
            <Box display="flex" alignItems="center">
              <Link
                href="/"
                sx={{
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {isMobile ? <Home /> : "HOME"}
              </Link>
              <Box m={isMobile ? 0.5 : 2} />
              <Link
                href="/history"
                sx={{
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {isMobile ? <History /> : "HISTORY"}
              </Link>
              <Box m={isMobile ? 0.5 : 2} />
              <Link
                href="/credits"
                sx={{
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {isMobile ? <Celebration /> : "CREDITS"}
              </Link>
            </Box>
          </Box>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        <Box
          sx={{
            pt: 2,
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NoSsr
            fallback={
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                my={2}
              >
                <Skeleton variant="circular" width={24} height={24} />
                <Box mr={1} />
                <Skeleton width={150} height={24} />
              </Box>
            }
          >
            <Box height={24} my={2}>
              <TwitterButton />
            </Box>
          </NoSsr>
          {children}
        </Box>
      </Container>
    </>
  );
}
