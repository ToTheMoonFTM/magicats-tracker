import { CAT_DATA } from "./catData";
import { performanceCalculator } from "./performanceCalculator";
import { MagicatsSaleData } from "./magicatsUtil";

export type SortMode = "price" | "ratio";

export const getSortFunction = (mode: SortMode) => {
  if (mode === "price") return sortByPrice;
  if (mode === "ratio") return sortByRatio;
};

const sortByPrice = (a: MagicatsSaleData, b: MagicatsSaleData) => {
  if (a.price === b.price) {
    return sortByRatio(a, b);
  } else {
    return parseInt(a.price) - parseInt(b.price);
  }
};

const sortByRatio = (a: MagicatsSaleData, b: MagicatsSaleData) => {
  const dataA = CAT_DATA[a.tokenId];
  const perfA = parseFloat(performanceCalculator(dataA.score, a.price));
  const dataB = CAT_DATA[b.tokenId];
  const perfB = parseFloat(performanceCalculator(dataB.score, b.price));
  return perfB - perfA;
};
