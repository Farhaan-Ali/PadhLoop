import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif', // Set global typography
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          padding: 16, // Consistent padding
          borderWidth: "1.5px",
          borderColor: "#e0e0e0", // Light border color for consistency
          borderRadius: 8, // Rounded corners
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl", // More manageable width for centering
      },
      styleOverrides: {
        root: {
          margin: "0 auto", // Center content
          padding: 16, // Consistent padding across views
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        container: {
          justifyContent: "center",
          alignItems: "center", // Align items in the center
          width: "100%", // Full width for uniformity
        },
        item: {
          padding: 8, // Consistent item spacing
        },
      },
    },
  },
  // Global Box Sizing
  cssBaseline: {
    styleOverrides: {
      "*": {
        boxSizing: "border-box",
      },
    },
  },
});

export default theme;
