import React, { useMemo } from "react";

import { Box } from "@mui/material";

import CatImage from "./CatImage";

import { SaleHistoryData } from "../utils/historyUtil";
import { CatHandler } from "../utils/CatHandler";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface Props {
  data: SaleHistoryData[];
  loading: boolean;
}

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "Sale #",
    minWidth: 75,
    width: 100,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "col2",
    headerName: "",
    minWidth: 120,
    width: 120,
    align: "center",
    renderCell: (params) => <CatImage tokenId={params.value} />,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "col3",
    headerName: "Name",
    minWidth: 300,
    width: 300,
    headerAlign: "left",
    align: "left",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "col4",
    headerName: "Rank",
    minWidth: 75,
    width: 100,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "col5",
    headerName: "MP",
    minWidth: 100,
    width: 120,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "col6",
    headerName: "Price",
    minWidth: 120,
    width: 150,
    headerAlign: "left",
    align: "left",
    sortComparator: (v1, v2) =>
      parseFloat(v1.replace(" FTM", "").replaceAll(",", "")) -
      parseFloat(v2.replace(" FTM", "").replaceAll(",", "")),
  },
  {
    field: "col7",
    headerName: "MP per FTM",
    minWidth: 100,
    width: 120,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "col8",
    headerName: "Date Sold",
    minWidth: 100,
    width: 120,
    headerAlign: "left",
    align: "left",
    sortable: false,
    disableColumnMenu: true,
  },
];

export default function HistoryTable({ data, loading }: Props) {
  const rows: GridRowsProp = useMemo(
    () =>
      data.map((sale, index) => ({
        id: data.length - index,
        col1: data.length - index,
        col2: sale.tokenId,
        col3: CatHandler.getName(sale.tokenId),
        col4: CatHandler.getRank(sale.tokenId),
        col5: CatHandler.getMP(sale.tokenId),
        col6: CatHandler.getPrice(sale.price),
        col7: CatHandler.getRatio(sale.tokenId, sale.price),
        col8: CatHandler.getDate(sale.endTime),
      })),
    [data]
  );

  return (
    <Box sx={{ height: 1200, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={120}
        disableColumnSelector
        disableSelectionOnClick
        loading={loading}
      />
    </Box>
  );
}
