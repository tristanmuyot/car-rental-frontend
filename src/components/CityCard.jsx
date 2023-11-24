import { Box, Typography, alpha, useTheme } from "@mui/material";

import CityImage from "../assets/images/city.jpg";

export default function CityCard(props) {
  const { title, availability } = props;

  const theme = useTheme();
  const { rawSienna } = theme.palette.common;

  return (
    <Box
      position="relative"
      bgcolor="#616161"
      p={2.75}
      sx={{
        width: "100%",
        height: "100%",
        aspectRatio: "296/237",
      }}
      display="flex"
      alignItems="flex-end"
    >
      <img
        src={CityImage}
        alt=""
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "0",
          top: "0",
          zIndex: 1,
        }}
      />
      <Box
        width="100%"
        height="100%"
        position="absolute"
        zIndex={2}
        bgcolor={alpha("#000", 0.7)}
        left="0"
        top="0"
      />
      <Box zIndex={3} position="relative">
        <Typography variant="h4" color={rawSienna} fontSize="24px">
          {title}
        </Typography>
        <Typography>Available ({availability})</Typography>
      </Box>
    </Box>
  );
}
