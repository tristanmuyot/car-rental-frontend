import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const theme = useTheme();
  const { darkCharcoal, white, rawSienna } = theme.palette.common;

  return (
    <Box py={{ xs: 3.5, md: 7.5 }} bgcolor={darkCharcoal}>
      <Stack
        px={{ xs: 2.5, md: 7.5 }}
        justifyContent="space-between"
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        textAlign={{xs: "center", md: 'left'}}
      >
        <Box>
          <NavLink to="/">
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                fontSize: 40,
              }}
              color={rawSienna}
            >
              CARPLEX
            </Typography>
          </NavLink>
          <Typography mt={2} color={white} maxWidth="250px" lineHeight="120%">
            Find the best car for your next visit
          </Typography>
        </Box>
        <Box>
          <Typography color={alpha(white, 0.5)}>
            © COPYRIGHT 2023 | TJM CAR RENTAL SERVICE
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
