import React from "react";
import Image from "next/image";

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
import { CAT_DATA } from "../utils/catData";
import { priceHandler } from "../utils/priceHandler";
import { performanceCalculator } from "../utils/performanceCalculator";
import { MagicatsSaleData } from "../utils/magicatsUtil";

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
  );
}
