import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
  Box,
  Chip,
  NoSsr,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GavelOutlined } from "@mui/icons-material";

import Link from "./Link";
import TableSkeleton from "./TableSkeleton";
import CatImage from "./CatImage";

import { SortMode, getSortFunction } from "../utils/sortFunctionByMode";
import { MagicatsSaleData } from "../utils/magicatsUtil";
import { CatHandler } from "../utils/CatHandler";

dayjs.extend(relativeTime);

interface Props {
  showAuction: boolean;
  sortMode: SortMode;
  data?: MagicatsSaleData[];
}

export default function MagicatsTable({ showAuction, sortMode, data }: Props) {
  return (
    <TableContainer
      component={Paper}
      elevation={2}
      sx={{ overflowY: "hidden" }}
    >
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
                .filter((sale) => (showAuction ? true : !sale.isAuction))
                .sort(getSortFunction(sortMode))
                .map((sale, index) => {
                  return (
                    <TableRow
                      key={sale.id}
                      sx={{
                        backgroundColor: CatHandler.getBgColor(
                          sale.tokenId,
                          sale.price
                        ),
                      }}
                    >
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
                      <TableCell>
                        <Box position="relative" sx={{ minWidth: 90 }}>
                          {CatHandler.getPrice(sale.price)}
                          {sale.isAuction && (
                            <Box position="absolute" top={28}>
                              <Chip
                                icon={<GavelOutlined fontSize="small" />}
                                label={`Ends in ${dayjs(sale.endTime).diff(
                                  dayjs(),
                                  "days"
                                )}d ${
                                  dayjs(sale.endTime).diff(dayjs(), "hours") %
                                  24
                                }h`}
                                size="small"
                                color="info"
                              />
                            </Box>
                          )}
                        </Box>
                      </TableCell>
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
