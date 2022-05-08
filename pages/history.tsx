import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import MainContainer from "../components/MainContainer";
import HistoryChart from "../components/HistoryChart";
import HistoryTable from "../components/HistoryTable";

import {
  HISTORY_URL,
  SaleHistoryData,
  castHistoryData,
  historyFetcher,
} from "../utils/historyUtil";
import { CatHandler } from "../utils/CatHandler";
import { useSales } from "../utils/useSales";

const History = ({
  sales: defaultSales,
  totalSalesAmount,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { sales, totalSales, loading } = useSales(
    defaultSales,
    totalSalesAmount
  );

  return (
    <MainContainer title="Sales History">
      <HistoryChart
        sales={sales}
        loading={loading}
        totalSalesAmount={totalSales}
      />
      <HistoryTable data={loading ? [] : sales} loading={loading} />
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

export default History;
