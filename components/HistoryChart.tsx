import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { scaleSqrt } from "d3-scale";

import { Box, Skeleton } from "@mui/material";

import { SaleHistoryData } from "../utils/historyUtil";

interface Props {
  sales: SaleHistoryData[];
  loading: boolean;
}

export default function HistoryChart({ sales, loading }: Props) {
  return (
    <Box mb={1} width="100%" height={500}>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart
            width={500}
            height={500}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              scale="time"
              type="number"
              dataKey="endTime"
              domain={["dataMin", "dataMax"]}
              name="Date"
              tickFormatter={(endTime) =>
                new Date(endTime).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }
              minTickGap={18}
            />
            <YAxis
              scale={scaleSqrt().exponent(0.3).range([0, 50000])}
              type="number"
              dataKey="price"
              name="Price"
              domain={[0, 52000]}
              ticks={[
                0, 100, 400, 1000, 5000, 10000, 15000, 20000, 40000, 50000,
              ]}
              allowDecimals
              allowDataOverflow
            />
            <ZAxis range={[30, 30]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value: number, name: string) => {
                if (name === "Price") {
                  return new Intl.NumberFormat().format(value) + " FTM";
                }
                if (name === "Date") {
                  return new Date(value).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                }
                return value;
              }}
            />
            <Scatter
              name="A school"
              data={sales.map((sale) => ({
                ...sale,
                price: Math.round(parseInt(sale.price) / 1e18),
              }))}
              fill="#8884d8"
            />
          </ScatterChart>
        </ResponsiveContainer>
      )}
      ;
    </Box>
  );
}
