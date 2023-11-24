import { createTheme } from "@mui/material";
import { createBreakpoints } from "@mui/system";

const breakpoints = createBreakpoints({});

const theme = createTheme({
  palette: {
    common: {
      // Add colors
      darkCharcoal: "#2f2f2f",
      solidWhite: "#ffffff",
      solidBlack: "#000000",
      rawSienna: "#cd7e52",
    },
  },
  typography: {
    allVariants: {
      fontFamily: '"Roboto", sans-serif',
    },

    h1: {
      fontFamily: '"Anton", sans-serif',
      textTransform: "uppercase",

      [breakpoints.up("xs")]: {
        fontSize: "40px",
      },
      [breakpoints.up("md")]: {
        fontSize: "64px",
      },
    },
    h2: {
      fontFamily: '"Anton", sans-serif',
      textTransform: "uppercase",

      [breakpoints.up("xs")]: {
        fontSize: "32px",
      },
      [breakpoints.up("md")]: {
        fontSize: "48px",
      },
    },
    h3: {
      fontFamily: '"Anton", sans-serif',
      textTransform: "uppercase",
    },
    h4: {
      fontFamily: '"Anton", sans-serif',
      fontSize: "14px",
      textTransform: "uppercase",
    },

    body1: {
      fontSize: "14px",
    },
  },
});

export default theme;
