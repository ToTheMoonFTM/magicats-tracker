import { CAT_DATA } from "./catData";
import { performanceCalculator } from "./performanceCalculator";
import { MagicatSaleData } from "./getMagicatData";

type SortMode = "price" | "ratio";

export const getSortFunction = (mode: SortMode) => {
  if (mode === "price") return sortByPrice;
  if (mode === "ratio") return sortByRatio;
};

const sortByPrice = (a: MagicatSaleData, b: MagicatSaleData) =>
  parseInt(a.price) - parseInt(b.price);

const sortByRatio = (a: MagicatSaleData, b: MagicatSaleData) => {
  const dataA = CAT_DATA[a.tokenId];
  const perfA = parseFloat(performanceCalculator(dataA.score, a.price));
  const dataB = CAT_DATA[b.tokenId];
  const perfB = parseFloat(performanceCalculator(dataB.score, b.price));
  return perfB - perfA;
};
