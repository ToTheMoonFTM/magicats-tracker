import React, { ImgHTMLAttributes, useState } from "react";

import { Box, Skeleton } from "@mui/material";
import { CatHandler } from "../utils/CatHandler";

interface Props extends ImgHTMLAttributes<any> {
  tokenId: number;
}

export default function CatImage({
  tokenId,
  width = 100,
  height = 100,
}: Props) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Box
      sx={{
        minWidth: typeof width === "number" ? Math.min(25, width) : 25,
        minHeight: typeof height === "number" ? Math.min(25, height) : 25,
        width,
        height,
      }}
    >
      {imageLoading && (
        <Skeleton variant="rectangular" width={width} height={height} />
      )}
      <img
        src={CatHandler.getImgURL(tokenId)}
        alt={`Magicat #${tokenId}`}
        width={imageLoading ? 0 : width}
        height={imageLoading ? 0 : height}
        onLoad={() => setImageLoading(false)}
      />
    </Box>
  );
}
