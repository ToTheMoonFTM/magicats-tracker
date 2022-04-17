import React from "react";
import Image from "next/image";

import {
  Box,
  NoSsr,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { CAT_DATA } from "../utils/catData";
import { priceHandler } from "../utils/priceHandler";
import { performanceCalculator } from "../utils/performanceCalculator";
import { SaleHistoryData } from "../utils/historyUtil";

import TableSkeleton from "./TableSkeleton";

interface Props {
  data: SaleHistoryData[];
  loading: boolean;
}

export default function HistoryTable({ data, loading }: Props) {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table sx={{ minWidth: 650 }} aria-label="magicats table">
        <TableHead>
          <TableRow>
            <TableCell>Sale #</TableCell>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell>MP</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>MP per FTM</TableCell>
            <TableCell>Date Sold</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <NoSsr fallback={<TableSkeleton />}>
            {loading ? (
              <TableSkeleton />
            ) : (
              data.map((sale, index) => {
                const catData = CAT_DATA[sale.tokenId];
                return (
                  <TableRow key={sale.id}>
                    <TableCell>{data.length - index}</TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 25, minHeight: 25 }}>
                        <Image
                          src={`https://media-nft.paintswap.finance/250_0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9_${sale.tokenId}.png`}
                          alt={`Magicat #${sale.tokenId}`}
                          width={100}
                          height={100}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{catData.name}</TableCell>
                    <TableCell>{catData.rank}</TableCell>
                    <TableCell>{Math.floor(catData.score)}</TableCell>
                    <TableCell>{priceHandler(sale.price)} FTM</TableCell>
                    <TableCell>
                      {performanceCalculator(catData.score, sale.price)}
                    </TableCell>
                    <TableCell>
                      {new Date(sale.endTime).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </NoSsr>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
