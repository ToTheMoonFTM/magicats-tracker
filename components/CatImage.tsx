import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

import { Box, Skeleton } from "@mui/material";
import { CatHandler } from "../utils/CatHandler";

interface Props extends Omit<ImageProps, "src" | "onLoadingComplete"> {
  tokenId: number;
}

export default function CatImage({
  tokenId,
  width = 100,
  height = 100,
  unoptimized = true,
}: Props) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Box
      sx={{
        minWidth: typeof width === "number" ? Math.min(25, width) : 25,
        minHeight: typeof height === "number" ? Math.min(25, height) : 25,
      }}
    >
      {imageLoading && (
        <Skeleton variant="rectangular" width={width} height={height} />
      )}
      <Image
        src={CatHandler.getImgURL(tokenId)}
        alt={`Magicat #${tokenId}`}
        width={imageLoading ? 0 : width}
        height={imageLoading ? 0 : height}
        onLoadingComplete={() => setImageLoading(false)}
        unoptimized={unoptimized}
      />
    </Box>
  );
}
