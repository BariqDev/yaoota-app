import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const Loader = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Stack>
  );
};

export default Loader;
