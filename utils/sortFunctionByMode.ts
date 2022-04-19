import { MagicatsSaleData } from "./magicatsUtil";
import { CatHandler } from "./CatHandler";

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
  const perfA = parseFloat(CatHandler.getRatio(a.tokenId, a.price));
  const perfB = parseFloat(CatHandler.getRatio(b.tokenId, b.price));
  return perfB - perfA;
};
