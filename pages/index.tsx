import React, { useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Copyright from "../components/Copyright";
import Link from "../components/Link";
import { priceHandler } from "../utils/priceHandler";
import { CAT_DATA } from "../utils/catData";
import { performanceCalculator } from "../utils/performanceCalculator";
import { getSortFunction } from "../utils/sortFunctionByMode";
import {
  castMagicatsSalesData,
  getMagicatsData,
  MagicatAPI,
} from "../utils/getMagicatData";

const BackToTop = dynamic(() => import("../components/BackToTop"), {
  ssr: false,
});

const Home = ({
  sales,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [sortMode, setSortMode] = useState<"price" | "ratio">("ratio");

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
        <Link
          sx={{ color: "#1da1f2" }}
          target="_blank"
          href="https://twitter.com/FTM_To_The_Moon"
          aria-label="twitter link"
        >
          Twitter
        </Link>
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
              {sales
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
                          alt={`magicat #${sale.tokenId}`}
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
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <BackToTop />
        <Copyright />
      </Box>
    </Container>
  );
};

interface ServerSideProps extends MagicatAPI {}

export const getServerSideProps: GetServerSideProps<
  ServerSideProps
> = async () => {
  const res = await getMagicatsData();
  return {
    props: {
      sales: castMagicatsSalesData(res.data.sales),
    },
  };
};

export default Home;
