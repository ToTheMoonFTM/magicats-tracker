import axios from "axios";
import { array, boolean, InferType, number, object, string } from "yup";

const MagicatSaleDataSchema = object({
  id: string().defined(),
  tokenId: number().defined(),
  isAuction: boolean().defined(),
  price: string().defined(),
});

export type MagicatSaleData = InferType<typeof MagicatSaleDataSchema>;

export interface MagicatAPI {
  sales: MagicatSaleData[];
}

export const getMagicatsData = async () =>
  await axios.get<MagicatAPI>(
    "https://api.paintswap.finance/v2/sales?collections=0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9&numToFetch=1000"
  );

export const castMagicatsSalesData = (sales: MagicatSaleData[]) =>
  array(MagicatSaleDataSchema).cast(sales, {
    stripUnknown: true,
  }) as MagicatSaleData[];
