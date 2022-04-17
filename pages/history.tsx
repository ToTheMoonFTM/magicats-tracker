import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";

import MainContainer from "../components/MainContainer";
import HistoryTable from "../components/HistoryTable";
import HistoryChart from "../components/HistoryChart";

import {
  HISTORY_URL,
  HistoryAPI,
  SaleHistoryData,
  castHistoryData,
  historyFetcher,
} from "../utils/historyUtil";

const BackToTop = dynamic(() => import("../components/BackToTop"), {
  ssr: false,
});

const History = ({
  sales: defaultSales,
  total: defaultTotal,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [sales, setSales] = useState(defaultSales);
  const [total, setTotal] = useState(defaultTotal);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let shouldFetchMore = false;
    do {
      historyFetcher(
        HISTORY_URL({ numToFetch: 50, numToSkip: total, direction: "asc" })
      ).then((data) => {
        if (data.sales.length > 0) {
          setSales([...castHistoryData(data.sales).reverse(), ...sales]);
          setTotal(sales.length);
          shouldFetchMore = true;
        } else {
          shouldFetchMore = false;
        }
      });
    } while (shouldFetchMore);
    setLoading(false);
  }, []);

  return (
    <MainContainer title="Sales History">
      <HistoryChart sales={sales} loading={loading} />
      <HistoryTable data={sales} loading={loading} />
      <BackToTop />
    </MainContainer>
  );
};

interface StaticProps extends HistoryAPI {}

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
      total = Math.max(total, data.total);
      sales.push(...castHistoryData(data.sales));
    } else {
      total = sales.length;
    }
  } while (sales.length < total);

  return {
    props: { sales, total },
  };
};

export default History;
