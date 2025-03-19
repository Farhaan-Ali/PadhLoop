import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="subtitle1" color="#8697c4">
      Copyright © 2024{" "}
      <Link to="/" style={{ color: "#3d52a0", textDecoration: "none" }}>
        PadhLoop
      </Link>
    </Typography>
  );
};

export default Copyright;
