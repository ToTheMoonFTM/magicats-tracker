import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";

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

const BackToTop = dynamic(() => import("../components/BackToTop"), {
  ssr: false,
});

const History = ({
  sales: defaultSales,
  totalSalesAmount,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [sales, setSales] = useState(defaultSales);
  const [totalSales, setTotalSales] = useState(totalSalesAmount);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let newSales = sales;
    let newTotalSales = totalSalesAmount;

    const fetchData = () =>
      historyFetcher(
        HISTORY_URL({
          numToFetch: 50,
          numToSkip: newSales.length,
          direction: "asc",
        })
      ).then((data) => {
        if (data.sales.length > 0) {
          newTotalSales = data.sales.reduce(
            (sum, curr) => sum + CatHandler.getSafePriceValue(curr.price),
            newTotalSales
          );
          newSales = [...castHistoryData(data.sales).reverse(), ...newSales];
          fetchData();
        } else {
          setSales(newSales);
          setTotalSales(newTotalSales);
          setLoading(false);
        }
      });

    fetchData();
  }, []);

  return (
    <MainContainer title="Magicats Sales History">
      <HistoryChart
        sales={sales}
        loading={loading}
        totalSalesAmount={totalSales}
      />
      <HistoryTable data={sales} loading={loading} />
      <BackToTop />
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
