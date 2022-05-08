import { CAT_DATA } from "./catData";
import { green } from "@mui/material/colors";

const getName = (tokenId: number) => CAT_DATA[tokenId].name;

const getRank = (tokenId: number) => CAT_DATA[tokenId].rank;

const getMP = (tokenId: number) => Math.floor(CAT_DATA[tokenId].score);

const getSafePriceValue = (price: string): number =>
  parseInt(price.length >= 12 ? price.substring(0, price.length - 12) : price) /
  1e6;

const getSafeRatioValue = (tokenId: number, price: string): number =>
  Math.round((CAT_DATA[tokenId].score * 1e3) / getSafePriceValue(price)) / 1e3;

const getPrice = (price: string) =>
  new Intl.NumberFormat().format(Math.round(parseInt(price) / 1e16) / 1e2) +
  " FTM";

const getRatio = (tokenId: number, price: string): string =>
  getSafeRatioValue(tokenId, price).toFixed(3);

const getDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getImgURL = (tokenId: number) =>
  `https://media-nft.paintswap.finance/250_0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9_${tokenId}.png`;

const getBgColor = (tokenId: number, price: string) => {
  if (getRank(tokenId) === 1) {
    return "gold";
  }
  const ratio = parseFloat(getRatio(tokenId, price));
  if (ratio >= 6) {
    return green[500];
  }
  if (ratio >= 5) {
    return green[300];
  }
  if (ratio >= 4) {
    return green[100];
  }
  return undefined;
};

export const CatHandler = Object.freeze({
  getName,
  getRank,
  getMP,
  getSafePriceValue,
  getSafeRatioValue,
  getPrice,
  getRatio,
  getDate,
  getImgURL,
  getBgColor,
});
