import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";

import Button from "./Button";

export default function CarCard(props) {
  const { name, brand, is_booked, transmission, image_url, rate } = props.data;

  const theme = useTheme();
  const { darkCharcoal, white } = theme.palette.common;

  return (
    <Box
      sx={{
        border: `1px solid ${darkCharcoal}`,
      }}
      position="relative"
      p={{
        xs: 2.5,
        md: 3.25,
      }}
      display="grid"
    >
      {is_booked && (
        <Box
          position="absolute"
          width="100%"
          height="100%"
          bgcolor={alpha(darkCharcoal, 0.8)}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" fontSize="24px" color={white}>
            CURRENTLY BOOKED
          </Typography>
        </Box>
      )}
      <Box width="100%">
        <img
          src={image_url}
          alt={name}
          width="100%"
          style={{ height: "100%", maxHeight: "200px", objectFit: "contain" }}
        />
      </Box>

      <Stack mt={2.5} direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h4" fontSize="20px" mb={1.25}>
            {name}
          </Typography>
          <Typography color={alpha(darkCharcoal, 0.5)}>{brand}</Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontSize="16px" mb={1.25}>
            {rate.price_formatted}
          </Typography>
          <Typography color={alpha(darkCharcoal, 0.5)}>
            {transmission}
          </Typography>
        </Box>
      </Stack>

      <Box alignSelf="flex-end" justifySelf="flex-end">
        <Button label="View Details" />
      </Box>
    </Box>
  );
}
