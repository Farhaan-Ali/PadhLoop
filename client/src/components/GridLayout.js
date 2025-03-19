import { Grid, Box, useMediaQuery } from "@mui/material";
import React from "react";

const GridLayout = (props) => {
  const { left, right, bottom } = props;
  
  // Check if screen size is smaller than medium (md)
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const boxStyles = {
    padding: 3,
    borderRadius: 4,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: 2,
        backgroundColor: "#f5f0f0",
        minHeight: "100vh",
        borderRadius: 4
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "xl",
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        {/* Main Content */}
        <Grid
          item
          xs={12} 
          md={8}
          sx={{
            ...boxStyles,
            width: { xs: "100%", md: "auto" },  // Full width on mobile
          }}
        >
          {left}
        </Grid>

        {/* Sidebar (only as a sidebar on medium screens and above) */}
        {!isSmallScreen && (
          <Grid
            item
            md={4}
            sx={{
              ...boxStyles,
              backgroundColor: "#f7f7f7",
              alignSelf: "flex-start",
            }}
          >
            {right}
          </Grid>
        )}

        {/* Bottom Layer - Show sidebar contents below main content on small screens */}
        <Grid
          item
          xs={12}
          sx={{
            ...boxStyles,
            marginTop: 2,
            width: "100%",  // Ensure full width for the bottom box
          }}
        >
          {isSmallScreen ? right : bottom}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GridLayout;
