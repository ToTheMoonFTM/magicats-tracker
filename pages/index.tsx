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
import { Box, FormControlLabel, Switch } from "@mui/material";

const BackToTop = dynamic(() => import("../components/BackToTop"), {
  ssr: false,
});

const Home = () => {
  const [showAuction, setShowAuction] = useState(false);
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
      <Box width="100%" display="flex" justifyContent="space-between">
        <FormControlLabel
          sx={{ minWidth: 200 }}
          control={<Switch checked={showAuction} />}
          label="Show Auctions"
          onChange={() => setShowAuction(!showAuction)}
        />
        <RefreshButton
          counter={counter}
          isValidating={isValidating}
          mutate={mutate}
        />
      </Box>
      <MagicatsTable
        data={data}
        sortMode={sortMode}
        showAuction={showAuction}
      />
      <BackToTop />
      <Copyright />
    </MainContainer>
  );
};

export default Home;
