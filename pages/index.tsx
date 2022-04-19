import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";

import Copyright from "../components/Copyright";
import MainContainer from "../components/MainContainer";
import SortButtonGroup from "../components/SortButtonGroup";
import RefreshButton from "../components/RefreshButton";
import MagicatsTable from "../components/MagicatsTable";

import {
  MAGIC_CATS_URL,
  MagicatsSaleData,
  magicatFetcher,
} from "../utils/magicatsUtil";

const BackToTop = dynamic(() => import("../components/BackToTop"), {
  ssr: false,
});

const Home = () => {
  const [sortMode, setSortMode] = useState<"price" | "ratio">("ratio");
  const [counter, setCounter] = useState(0);
  const { data, mutate, isValidating } = useSWR<MagicatsSaleData[]>(
    MAGIC_CATS_URL,
    magicatFetcher,
    {
      refreshInterval: 60000,
      onSuccess: () => setCounter(0),
    }
  );

  useEffect(() => {
    const interval = setInterval(
      () => setCounter((counter) => counter + 1),
      1000
    );
    return () => {
      clearTimeout(interval);
    };
  }, []);

  return (
    <MainContainer title="Magicats Tracker">
      <SortButtonGroup sortMode={sortMode} setSortMode={setSortMode} />
      <RefreshButton
        counter={counter}
        isValidating={isValidating}
        mutate={mutate}
      />
      <MagicatsTable data={data} sortMode={sortMode} />
      <BackToTop />
      <Copyright />
    </MainContainer>
  );
};

export default Home;
