import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import useSWR from "swr";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  NoSsr,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Copyright from "../components/Copyright";
import Link from "../components/Link";
import { priceHandler } from "../utils/priceHandler";
import { CAT_DATA } from "../utils/catData";
import { performanceCalculator } from "../utils/performanceCalculator";
import { getSortFunction } from "../utils/sortFunctionByMode";
import {
  MAGIC_CATS_URL,
  MagicatsSaleData,
  magicatFetcher,
} from "../utils/magicatsUtil";
import TableSkeleton from "../components/TableSkeleton";

const BackToTop = dynamic(() => import("../components/BackToTop"), {
  ssr: false,
});

const TwitterButton = dynamic(() => import("../components/TwitterButton"), {
  ssr: false,
});

const Home = () => {
  const [sortMode, setSortMode] = useState<"price" | "ratio">("ratio");
  const [counter, setCounter] = useState(0);
  const { data, mutate, isValidating } = useSWR<MagicatsSaleData[]>(
    MAGIC_CATS_URL,
    magicatFetcher,
    {
      refreshInterval: 60000,
      onSuccess: () => setCounter(0),
    }
  );

  useEffect(() => {
    const interval = setInterval(
      () => setCounter((counter) => counter + 1),
      1000
    );
    return () => {
      clearTimeout(interval);
    };
  }, []);

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
          Magicats Tracker
        </Typography>
        <NoSsr
          fallback={<Skeleton variant="circular" width={24} height={24} />}
        >
          <Box width={24} height={24}>
            <TwitterButton />
          </Box>
        </NoSsr>
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
                  href="https://spookyswap.finance/magicats"
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
        <TableContainer component={Paper} elevation={2}>
          <Table sx={{ minWidth: 650 }} aria-label="magicats table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Rank</TableCell>
                <TableCell>MP</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>MP per FTM</TableCell>
                <TableCell>URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <NoSsr fallback={<TableSkeleton />}>
                {data ? (
                  data
                    .filter((sale) => !sale.isAuction)
                    .sort(getSortFunction(sortMode))
                    .map((sale) => {
                      const catData = CAT_DATA[sale.tokenId];
                      return (
                        <TableRow key={sale.id}>
                          <TableCell>{sale.tokenId}</TableCell>
                          <TableCell>
                            <Image
                              src={`https://media-nft.paintswap.finance/250_0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9_${sale.tokenId}.png`}
                              alt={`Magicat #${sale.tokenId}`}
                              width={100}
                              height={100}
                            />
                          </TableCell>
                          <TableCell>{catData.name}</TableCell>
                          <TableCell>{catData.rank}</TableCell>
                          <TableCell>{Math.floor(catData.score)}</TableCell>
                          <TableCell>{priceHandler(sale.price)} FTM</TableCell>
                          <TableCell>
                            {performanceCalculator(catData.score, sale.price)}
                          </TableCell>
                          <TableCell>
                            <Link
                              target="_blank"
                              href={`https://paintswap.finance/marketplace/${sale.id}`}
                            >
                              link
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableSkeleton />
                )}
              </NoSsr>
            </TableBody>
          </Table>
        </TableContainer>
        <BackToTop />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Home;
