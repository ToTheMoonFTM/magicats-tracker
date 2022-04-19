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

import Link from "./Link";
import TableSkeleton from "./TableSkeleton";

import { SortMode, getSortFunction } from "../utils/sortFunctionByMode";
import { MagicatsSaleData } from "../utils/magicatsUtil";
import { CatHandler } from "../utils/CatHandler";
import CatImage from "./CatImage";

interface Props {
  sortMode: SortMode;
  data?: MagicatsSaleData[];
}

export default function MagicatsTable({ sortMode, data }: Props) {
  return (
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
                .map((sale, index) => {
                  return (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.tokenId}</TableCell>
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
  );
}
