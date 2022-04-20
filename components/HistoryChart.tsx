import React, { useMemo } from "react";
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { scaleSqrt } from "d3-scale";

import {
  Box,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import CatImage from "./CatImage";

import { SaleHistoryData } from "../utils/historyUtil";
import { CatHandler } from "../utils/CatHandler";

const DateTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={22}
        y={0}
        dy={20}
        textAnchor="end"
        fill="#666"
        transform="rotate(-25)"
      >
        {CatHandler.getDate(payload.value)}
      </text>
    </g>
  );
};

const CustomToolTip = ({ active, payload }: TooltipProps<any, any>) => {
  if (!active || !payload || payload.length === 0) return null;
  const { price, endTime, tokenId } = payload[0].payload as SaleHistoryData;
  return (
    <Paper key={endTime}>
      <Box
        p={2}
        display="flex"
        alignItems="center"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Box
          width={150}
          height={150}
          mr={{ xs: 0, sm: 1 }}
          mb={{ xs: 1, sm: 0 }}
        >
          <CatImage tokenId={tokenId} width={150} height={150} />
        </Box>
        <Box>
          <Typography>ID: #{tokenId}</Typography>
          <Typography>Name: {CatHandler.getName(tokenId)}</Typography>
          <Typography>Rank: {CatHandler.getRank(tokenId)}</Typography>
          <Typography>MP: {CatHandler.getMP(tokenId)}</Typography>
          <Typography>Price: {CatHandler.getPrice(price)}</Typography>
          <Typography>
            MP per FTM: {CatHandler.getRatio(tokenId, price)}
          </Typography>
          <Typography>Sold On: {CatHandler.getDate(endTime)}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

interface Props {
  sales: SaleHistoryData[];
  loading: boolean;
  totalSalesAmount: number;
}

export default function HistoryChart({
  sales,
  loading,
  totalSalesAmount,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const avgPrice = useMemo(
    () => Math.round(totalSalesAmount / sales.length),
    [totalSalesAmount, sales]
  );

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
              right: isMobile ? 0 : 20,
              bottom: isMobile ? 0 : 20,
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
              domain={[0, 5.2e22]}
              ticks={[
                0, 1e20, 4e20, 1e21, 5e21, 1e22, 1.5e22, 2e22, 4e22, 5e22,
              ]}
              tickFormatter={(price: number) =>
                CatHandler.getSafePriceValue(
                  price.toLocaleString("fullwide", { useGrouping: false })
                ).toString()
              }
              mirror={isMobile}
            />
            <ZAxis range={[30, 30]} />
            <Tooltip content={<CustomToolTip />} />
            <Scatter
              name="normal cats"
              data={sales.filter(
                (sale) => CatHandler.getRank(sale.tokenId) > 1
              )}
              fill="#8884d8"
            />
            <Scatter
              isAnimationActive={false}
              name="legendary cats"
              data={sales.filter(
                (sale) => CatHandler.getRank(sale.tokenId) === 1
              )}
              fill="orange"
              shape="star"
            />
            <ReferenceLine
              y={avgPrice * 1e18}
              stroke="green"
              strokeDasharray="3 3"
              label={{
                value: `Average Price (${avgPrice} FTM)`,
                position: "insideTopRight",
                fill: "green",
              }}
            />
            <ReferenceLine
              y={100e18}
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
