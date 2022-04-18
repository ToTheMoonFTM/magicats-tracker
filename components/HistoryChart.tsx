import React, { useMemo } from "react";
import {
  CartesianGrid,
  ReferenceLine,
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

const dateFormatter = (dateValue: number) =>
  new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const DateTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-25)"
      >
        {dateFormatter(payload.value)}
      </text>
    </g>
  );
};

interface Props {
  sales: SaleHistoryData[];
  loading: boolean;
}

export default function HistoryChart({ sales, loading }: Props) {
  const transformedSales = useMemo(
    () =>
      sales.map((sale) => ({
        ...sale,
        price: Math.round(parseInt(sale.price) / 1e18),
      })),
    [sales]
  );

  const avgPrice = useMemo(() => {
    let totalSalePrice = 0;
    for (const sale of transformedSales) totalSalePrice += sale.price;
    return Math.round(totalSalePrice / transformedSales.length);
  }, [transformedSales]);

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
              height={60}
              tick={<DateTick />}
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
            <Scatter name="A school" data={transformedSales} fill="#8884d8" />
            <ReferenceLine
              y={avgPrice}
              stroke="green"
              strokeDasharray="3 3"
              label={{
                value: `Average Price (${avgPrice} FTM)`,
                position: "insideTopRight",
                fill: "green",
              }}
            />
            <ReferenceLine
              y={100}
              stroke="red"
              strokeDasharray="3 3"
              label={{
                value: "Mint Price (100 FTM)",
                position: "insideTopRight",
                fill: "red",
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}
