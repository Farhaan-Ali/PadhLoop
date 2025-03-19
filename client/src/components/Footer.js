import { Card, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";
import { TfiLoop } from "react-icons/tfi";
const Footer = () => {
  return (
    <Box pb={3}>
      <Card>
        <Typography variant="subtitle1" fontSize="25px">
          PadhLoop
          <a
            href="/"
            target="_blank"
          >
          </a>
          <TfiLoop size={25} color="#5c7fdb" style={{ marginLeft: '10px' }} />
        </Typography>
      </Card>
    </Box>
  );
};

export default Footer;
