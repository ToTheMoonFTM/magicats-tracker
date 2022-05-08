import React, { useMemo } from "react";
import useSWR from "swr";

import Copyright from "../components/Copyright";
import MainContainer from "../components/MainContainer";

import {
  MAGIC_CATS_URL,
  MagicatsSaleData,
  magicatFetcher,
} from "../utils/magicatsUtil";
import { Box, Grid, Typography } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  HISTORY_URL,
  SaleHistoryData,
  castHistoryData,
  historyFetcher,
} from "../utils/historyUtil";
import { CatHandler } from "../utils/CatHandler";
import { useSales } from "../utils/useSales";
import StatCard from "../components/StatCard";
import dayjs from "dayjs";
import { blue, green, orange, red } from "@mui/material/colors";

const Statistics = ({
  sales: defaultSales,
  totalSalesAmount,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useSWR<MagicatsSaleData[]>(MAGIC_CATS_URL, magicatFetcher);
  const { sales, loading } = useSales(defaultSales, totalSalesAmount);

  const { aucFloorPrice, floorPrice, aucHighestRatio, highestRatio } =
    useMemo(() => {
      let priceWithAuction = Infinity;
      let priceWithoutAuction = Infinity;
      let ratioWithAuction = -Infinity;
      let ratioWithoutAuction = -Infinity;
      for (const sale of data || []) {
        const price = CatHandler.getSafePriceValue(sale.price);
        const ratio = CatHandler.getSafeRatioValue(sale.tokenId, sale.price);
        priceWithAuction = Math.min(priceWithAuction, price);
        ratioWithAuction = Math.max(ratioWithAuction, ratio);
        if (!sale.isAuction) {
          priceWithoutAuction = Math.min(priceWithoutAuction, price);
          ratioWithoutAuction = Math.max(ratioWithoutAuction, ratio);
        }
      }
      return {
        aucFloorPrice: priceWithAuction + " FTM",
        floorPrice: priceWithoutAuction + " FTM",
        aucHighestRatio: ratioWithAuction.toFixed(3),
        highestRatio: ratioWithoutAuction.toFixed(3),
      };
    }, [data]);

  const {
    dailyAvgPrice,
    dailyAvgRatio,
    dailyCount,
    weeklyAvgPrice,
    weeklyAvgRatio,
    weeklyCount,
    monthlyAvgPrice,
    monthlyAvgRatio,
    monthlyCount,
  } = useMemo(() => {
    let dailyPriceTotal = 0;
    let dailyRatioTotal = 0;
    let dailyCount = 0;
    let weeklyPriceTotal = 0;
    let weeklyRatioTotal = 0;
    let weeklyCount = 0;
    let monthlyPriceTotal = 0;
    let monthlyRatioTotal = 0;
    let monthlyCount = 0;

    for (const sale of sales) {
      const price = CatHandler.getSafePriceValue(sale.price);
      const ratio = CatHandler.getSafeRatioValue(sale.tokenId, sale.price);
      if (dayjs(sale.endTime).isAfter(dayjs().subtract(30, "day"))) {
        monthlyPriceTotal += price;
        monthlyRatioTotal += ratio;
        monthlyCount++;
        if (dayjs(sale.endTime).isAfter(dayjs().subtract(7, "day"))) {
          weeklyPriceTotal += price;
          weeklyRatioTotal += ratio;
          weeklyCount++;
          if (dayjs(sale.endTime).isAfter(dayjs().subtract(1, "day"))) {
            dailyPriceTotal += price;
            dailyRatioTotal += ratio;
            dailyCount++;
          }
        }
      }
    }
    return {
      dailyAvgPrice:
        (dailyCount > 0 ? (dailyPriceTotal / dailyCount).toFixed(1) : 0) +
        " FTM",
      dailyAvgRatio:
        dailyCount > 0 ? (dailyRatioTotal / dailyCount).toFixed(3) : 0,
      dailyCount,
      weeklyAvgPrice:
        (weeklyCount > 0 ? (weeklyPriceTotal / weeklyCount).toFixed(1) : 0) +
        " FTM",
      weeklyAvgRatio:
        weeklyCount > 0 ? (weeklyRatioTotal / weeklyCount).toFixed(3) : 0,
      weeklyCount,
      monthlyAvgPrice:
        (monthlyCount > 0 ? (monthlyPriceTotal / monthlyCount).toFixed(1) : 0) +
        " FTM",
      monthlyAvgRatio:
        monthlyCount > 0 ? (monthlyRatioTotal / monthlyCount).toFixed(3) : 0,
      monthlyCount,
    };
  }, [sales]);

  return (
    <MainContainer title="Sales Statistics">
      <Typography variant="h3" color={green[500]} gutterBottom>
        Current
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StatCard
            title="Floor Price"
            content={floorPrice}
            loading={!data}
            contentColor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatCard
            title="Highest MP / FTM"
            content={highestRatio}
            loading={!data}
            contentColor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatCard
            title="Floor Price (with auction)"
            content={aucFloorPrice}
            loading={!data}
            contentColor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatCard
            title="Highest MP / FTM (with auction)"
            content={aucHighestRatio}
            loading={!data}
            contentColor={green[500]}
          />
        </Grid>
      </Grid>
      <Box my={2} />
      <Typography variant="h3" color={blue[400]} gutterBottom>
        24 Hours
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Sales"
            content={dailyCount}
            loading={loading}
            contentColor={blue[400]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Average Sales Price"
            content={dailyAvgPrice}
            loading={loading}
            contentColor={blue[400]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Average MP per FTM"
            content={dailyAvgRatio}
            loading={loading}
            contentColor={blue[400]}
          />
        </Grid>
      </Grid>
      <Box my={2} />
      <Typography variant="h3" color={orange[600]} gutterBottom>
        7 Days
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Sales"
            content={weeklyCount}
            loading={loading}
            contentColor={orange[600]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Average Sales Price"
            content={weeklyAvgPrice}
            loading={loading}
            contentColor={orange[600]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Average MP per FTM"
            content={weeklyAvgRatio}
            loading={loading}
            contentColor={orange[600]}
          />
        </Grid>
      </Grid>
      <Box my={2} />
      <Typography variant="h3" color={red[400]} gutterBottom>
        30 Days
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Sales"
            content={monthlyCount}
            loading={loading}
            contentColor={red[400]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Average Sales Price"
            content={monthlyAvgPrice}
            loading={loading}
            contentColor={red[400]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Average MP per FTM"
            content={monthlyAvgRatio}
            loading={loading}
            contentColor={red[400]}
          />
        </Grid>
      </Grid>
      <Box my={2} />

      <Copyright />
    </MainContainer>
  );
};

interface StaticProps {
  sales: SaleHistoryData[];
  totalSalesAmount: number;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const sales: SaleHistoryData[] = [];
  let total = Number.MAX_SAFE_INTEGER;
  do {
    const data = await historyFetcher(
      HISTORY_URL({
        numToFetch: Math.min(total - sales.length, 1000),
        numToSkip: sales.length,
      })
    );
    if (data.sales.length > 0) {
      sales.push(...castHistoryData(data.sales));
    } else {
      total = sales.length;
    }
  } while (sales.length < total);

  const totalSalesAmount = sales.reduce(
    (sum, curr) => sum + CatHandler.getSafePriceValue(curr.price),
    0
  );

  return {
    props: { sales, totalSalesAmount },
  };
};

export default Statistics;
