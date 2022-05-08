import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  TypographyProps,
} from "@mui/material";
import React from "react";

interface Props {
  title: string;
  content: string | number;
  contentColor: TypographyProps["color"];
  loading: boolean;
}

export default function StatCard({
  title,
  content,
  contentColor,
  loading,
}: Props) {
  return (
    <Paper
      elevation={4}
      sx={{ display: "flex", flexDirection: "column", height: 100 }}
    >
      <Box ml={1} mt={0.5} color="gray">
        <Typography fontWeight={500}>{title}</Typography>
      </Box>
      <Box
        display="flex"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        mb={1}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h3" fontWeight={600} color={contentColor}>
            {content}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
