import React, { useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Copyright from "../src/Copyright";
import { priceHandler } from "../utils/priceHandler";
import { CAT_DATA } from "../utils/catData";
import { performanceCalculator } from "../utils/performanceCalculator";
import { getSortFunction } from "../utils/sortFunctionByMode";

export interface MagicatSaleData {
  id: string;
  tokenId: number;
  startTime: string;
  endTime: string;
  isAuction: boolean;
  price: string;
  seller: string;
}

const BackToTop = dynamic(() => import("../src/BackToTop"), {
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
        <Box my={1}>
          <Typography component="h1" gutterBottom>
            Credits:{" "}
            <Link
              target="_blank"
              href="https://paintswap.finance/"
              underline="hover"
            >
              PaintSwap
            </Link>
            , and King (Mod from SpookySwap) for his{" "}
            <Link
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/1NS1VFfALpGe9anjCJNaNFXZXTxnvUcq1EbSIU_psSsQ/edit#gid=789621007&fvid=710219763"
              underline="hover"
            >
              Magicats Rarity Data Sheet
            </Link>
          </Typography>
        </Box>
        <Box display="flex" mb={2}>
          <Box mx={1}>
            <Button
              variant={sortMode === "price" ? "contained" : "outlined"}
              onClick={() => setSortMode("price")}
            >
              Sort By Lowest Price
            </Button>
          </Box>
          <Box mx={1}>
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

interface MagicatAPI {
  sales: MagicatSaleData[];
}

interface ServerSideProps {
  sales: MagicatSaleData[];
}

export const getServerSideProps: GetServerSideProps<
  ServerSideProps
> = async () => {
  const res = await axios.get<MagicatAPI>(
    "https://api.paintswap.finance/v2/sales?collections=0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9&numToFetch=1000"
  );
  return { props: { sales: res.data.sales } };
};

export default Home;
