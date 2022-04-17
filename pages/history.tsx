import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { scaleSqrt } from "d3-scale";

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

import MainContainer from "../components/MainContainer";
import HistoryTable from "../components/HistoryTable";

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
      historyFetcher(HISTORY_URL({ numToFetch: 50, numToSkip: total })).then(
        (data) => {
          if (data.sales.length > 0) {
            setSales([...sales, ...castHistoryData(data.sales)]);
            setTotal(sales.length);
            shouldFetchMore = true;
          } else {
            shouldFetchMore = false;
          }
        }
      );
    } while (shouldFetchMore);
    setLoading(false);
  }, []);

  return (
    <MainContainer title="Sales History">
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
            ticks={[0, 100, 400, 1000, 5000, 10000, 15000, 20000, 40000, 50000]}
            allowDecimals
            allowDataOverflow
          />
          <ZAxis range={[30, 30]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value: number, name: string) => {
              if (name === "Price") {
                return value + " FTM";
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
