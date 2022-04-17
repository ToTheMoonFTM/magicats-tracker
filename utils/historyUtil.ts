import { InferType, array, number, object, string } from "yup";

import { fetcher } from "./fetcher";

const SaleHistorySchema = object({
  id: string().defined(),
  tokenId: number().defined(),
  price: string().defined(),
  endTime: number().defined(),
});

export type SaleHistoryData = InferType<typeof SaleHistorySchema>;

export interface HistoryAPI {
  sales: SaleHistoryData[];
  total: number;
}

interface QueryParams {
  numToFetch: number;
  numToSkip: number;
  direction?: "desc" | "asc";
}

export const HISTORY_URL = ({
  numToFetch,
  numToSkip,
  direction = "desc",
}: QueryParams) =>
  `https://api.paintswap.finance/v2/sales?numToFetch=${numToFetch}&numToSkip=${numToSkip}&sold=true&sort=recently-sold&collections[0]=0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9&version=2&orderBy=endTime&orderDirection=${direction}&includeNFTs=true`;

export const historyFetcher = (url: string) =>
  fetcher<HistoryAPI>(url).then((data) => data);

export const castHistoryData = (sales: SaleHistoryData[]) =>
  array(SaleHistorySchema).cast(
    sales.map((sale) => Object.assign(sale, { endTime: sale.endTime * 1000 })),
    { stripUnknown: true }
  ) as SaleHistoryData[];
