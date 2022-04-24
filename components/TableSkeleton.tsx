import React from "react";

import { Skeleton, TableCell, TableRow } from "@mui/material";

export default function TableSkeleton() {
  return (
    <>
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton sx={{ width: { xs: 30, md: 40 } }} />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" width={100} height={100} />
            </TableCell>
            <TableCell>
              <Skeleton sx={{ width: { xs: 140, md: 250 } }} />
            </TableCell>
            <TableCell>
              <Skeleton sx={{ width: { xs: 30, md: 40 } }} />
            </TableCell>
            <TableCell>
              <Skeleton sx={{ width: { xs: 30, md: 40 } }} />
            </TableCell>
            <TableCell>
              <Skeleton sx={{ width: { xs: 40, md: 50 } }} />
            </TableCell>
            <TableCell>
              <Skeleton sx={{ width: { xs: 35, md: 45 } }} />
            </TableCell>
            <TableCell>
              <Skeleton sx={{ width: { xs: 25, md: 35 } }} />
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
