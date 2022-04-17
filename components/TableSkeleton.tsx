import React from "react";

import { Skeleton, TableCell, TableRow } from "@mui/material";

export default function TableSkeleton() {
  return (
    <>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton sx={{ width: { xs: 30, md: 40 } }} />
            </TableCell>
            <TableCell>
              <Skeleton
                variant="rectangular"
                sx={{
                  width: { xs: 22, sm: 40, md: 82, lg: 100 },
                  height: { xs: 22, sm: 40, md: 82, lg: 100 },
                }}
              />
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
