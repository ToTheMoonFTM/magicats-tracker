import React from "react";

import {
  NoSsr,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import TableSkeleton from "./TableSkeleton";
import CatImage from "./CatImage";

import { SaleHistoryData } from "../utils/historyUtil";
import { CatHandler } from "../utils/CatHandler";

interface Props {
  data: SaleHistoryData[];
  loading: boolean;
}

export default function HistoryTable({ data, loading }: Props) {
  return (
    <TableContainer
      component={Paper}
      elevation={2}
      sx={{ overflowY: "hidden" }}
    >
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
                return (
                  <TableRow
                    key={sale.id}
                    sx={{
                      backgroundColor:
                        CatHandler.getRank(sale.tokenId) === 1
                          ? "gold"
                          : undefined,
                    }}
                  >
                    <TableCell>{data.length - index}</TableCell>
                    <TableCell>
                      <CatImage
                        tokenId={sale.tokenId}
                        unoptimized={index > 20} // to avoid exceeding vercel's usage limit
                      />
                    </TableCell>
                    <TableCell>{CatHandler.getName(sale.tokenId)}</TableCell>
                    <TableCell>{CatHandler.getRank(sale.tokenId)}</TableCell>
                    <TableCell>{CatHandler.getMP(sale.tokenId)}</TableCell>
                    <TableCell>{CatHandler.getPrice(sale.price)}</TableCell>
                    <TableCell>
                      {CatHandler.getRatio(sale.tokenId, sale.price)}
                    </TableCell>
                    <TableCell>{CatHandler.getDate(sale.endTime)}</TableCell>
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
