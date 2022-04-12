import { array, boolean, InferType, number, object, string } from "yup";

const MagicatsSaleDataSchema = object({
  id: string().defined(),
  tokenId: number().defined(),
  isAuction: boolean().defined(),
  price: string().defined(),
});

export type MagicatsSaleData = InferType<typeof MagicatsSaleDataSchema>;

export interface MagicatsAPI {
  sales: MagicatsSaleData[];
}

export const MAGIC_CATS_URL =
  "https://api.paintswap.finance/v2/sales?collections=0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9&numToFetch=1000";

export const castMagicatsSalesData = (sales: MagicatsSaleData[]) =>
  array(MagicatsSaleDataSchema).cast(sales, {
    stripUnknown: true,
  }) as MagicatsSaleData[];
