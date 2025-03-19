import { Stack, Typography, Skeleton, Box } from "@mui/material";
import React from "react";

const Loading = ({ label = "Loading" }) => (
  <Stack alignItems="center" sx={{ width: '100%', maxWidth: '600px', mx: 'auto', p: 2 }}>
    <Skeleton variant="rectangular" width="100%" height={100} sx={{ my: 1 }} />
    <Skeleton variant="rectangular" width="100%" height={50} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="80%" sx={{ mb: 3 }} />
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      {label}
    </Typography>
  </Stack>
);

export default Loading;
