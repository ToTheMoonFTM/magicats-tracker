import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Copyright from "../components/Copyright";
import MainContainer from "../components/MainContainer";

import {
  Autocomplete,
  Box,
  Divider,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { CAT_DATA } from "../utils/catData";
import CatImage from "../components/CatImage";
import { CatHandler } from "../utils/CatHandler";
import { Star } from "@mui/icons-material";

interface AutocompleteOption {
  id: number;
  label: string;
}

const options: AutocompleteOption[] = CAT_DATA.map((cat) => ({
  id: cat.id,
  label: `#${cat.id} - ${cat.name}`,
}));

const Helper = () => {
  const [selected, setSelected] = useState<AutocompleteOption | null>(null);
  const [price, setPrice] = useState("");
  const [ratio, setRatio] = useState("");
  const [lastInputted, setLastInputted] = useState<"price" | "ratio" | null>(
    null
  );

  useEffect(() => {
    if (selected && lastInputted) {
      if (lastInputted === "price" && price) {
        setRatio(
          (
            Math.round(
              (CAT_DATA[selected.id].score * 1e3) / parseFloat(price)
            ) / 1e3
          ).toFixed(3)
        );
      } else if (lastInputted === "ratio" && ratio) {
        setPrice((CAT_DATA[selected.id].score / parseFloat(ratio)).toFixed(1));
      } else {
        setPrice("");
        setRatio("");
      }
    } else {
      setPrice("");
      setRatio("");
    }
  }, [selected]);

  const { name, title } = useMemo(() => {
    if (!selected) return { name: "", title: "" };
    const fullName = CatHandler.getName(selected.id).split(",");
    return { name: fullName[0].trim(), title: fullName[1]?.trim() };
  }, [selected]);

  const onPriceChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (selected) {
        setLastInputted("price");
        const value = e.target.value;
        if (!value) {
          setPrice("");
          setRatio("");
        } else {
          setPrice(value);
          setRatio(
            (
              Math.round(
                (CAT_DATA[selected.id].score * 1e3) / parseFloat(value)
              ) / 1e3
            ).toFixed(3)
          );
        }
      }
    },
    [selected]
  );

  const onRatioChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLastInputted("ratio");
      if (selected) {
        const value = e.target.value;
        if (!value) {
          setPrice("");
          setRatio("");
        } else {
          setRatio(value);
          setPrice(
            (CAT_DATA[selected.id].score / parseFloat(value)).toFixed(1)
          );
        }
      }
    },
    [selected]
  );

  const activeStep = useMemo(() => {
    if (!selected) {
      return 0;
    } else if (price === "" || ratio === "") {
      return 1;
    } else {
      return 2;
    }
  }, [selected, price, ratio]);

  return (
    <MainContainer title="Sales Helper">
      <Box my={1}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Select Your Magicat</StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Calculate Your Target Sale Price or MP per FTM Ratio
            </StepLabel>
          </Step>
        </Stepper>
      </Box>
      <Autocomplete
        size="small"
        disablePortal
        value={selected}
        onChange={(_, value) => setSelected(value)}
        sx={{ width: { xs: 375, sm: 450 }, my: 1 }}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search By Your Cat's Name or ID"
          />
        )}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 350,
          maxWidth: { xs: 375, sm: 500 },
          height: 500,
          my: 2,
          p: 4,
          border: "3px dashed gainsboro",
          borderRadius: 16,
        }}
      >
        {selected ? (
          <>
            <CatImage tokenId={selected.id} width={150} height={150} />
            <Box
              mt={1}
              ml={1}
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
            >
              <Box
                my={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight={900}>
                  {name}
                </Typography>
                {title && (
                  <Typography fontWeight={500}>
                    <Star sx={{ fontSize: 12, color: "gold", mr: 1 }} />
                    {title}
                    <Star sx={{ fontSize: 12, color: "gold", ml: 1 }} />
                  </Typography>
                )}
              </Box>
              <Box mb={1}>
                <Divider />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography fontFamily="helvetica">
                  ID #{selected.id}
                </Typography>
                <Typography fontFamily="helvetica">
                  MP: {CatHandler.getMP(selected.id)}
                </Typography>
              </Box>
              <Typography
                textAlign="center"
                fontFamily="helvetica"
                sx={{ mt: 1, color: "gold" }}
              >
                Rank: {CatHandler.getRank(selected.id)}
              </Typography>
              <Box my={2} />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
              >
                <TextField
                  variant="outlined"
                  size="small"
                  label="Proposed Sales Price"
                  placeholder="e.g. 500 FTM"
                  type="number"
                  value={price}
                  onChange={onPriceChange}
                  focused
                />
                <Box my={1} />
                <TextField
                  variant="outlined"
                  size="small"
                  label="Proposed MP per FTM Ratio"
                  placeholder="e.g. 3.500"
                  type="number"
                  value={ratio}
                  onChange={onRatioChange}
                  focused
                />
              </Box>
            </Box>
          </>
        ) : null}
      </Box>
      <Copyright />
    </MainContainer>
  );
};

export default Helper;
