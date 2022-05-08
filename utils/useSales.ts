import { useEffect, useState } from "react";
import {
  HISTORY_URL,
  SaleHistoryData,
  castHistoryData,
  historyFetcher,
} from "./historyUtil";
import { CatHandler } from "./CatHandler";

export const useSales = (
  defaultSales: SaleHistoryData[],
  totalSalesAmount: number
) => {
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

  return { sales, totalSales, loading };
};
