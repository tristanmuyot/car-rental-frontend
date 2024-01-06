import { Box, Grid, Stack, Typography, alpha, useTheme } from "@mui/material";
import ContentContainer from "../components/ContentContainer";
import { NAVBAR_DESKTOP_HEIGHT } from "../components/Header/HeaderDesktop";

import DefaultAvatar from "../assets/images/sample-avatar.jpg";
import CarCard from "../components/CarCard";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import getCarByUserId from "../utils/getCarsByUserId";

export default function ProfilePage() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const { username, full_name, email_address } = user.data;
  const [cars, setCars] = useState([]);

  const theme = useTheme();
  const { darkCharcoal, rawSienna, white } = theme.palette.common;

  useEffect(() => {
    getCarByUserId()
      .then((carsx) => {
        setCars(carsx.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ContentContainer>
      <Box
        bgcolor="#F6F6F6"
        minHeight={`calc(100vh - ${NAVBAR_DESKTOP_HEIGHT}px - 157px)`}
        color={darkCharcoal}
        pb={{ xs: 7.5, md: 12.5 }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          px={{ xs: 2.5, md: 7.5 }}
          columnGap={5}
          alignItems="flex-start"
        >
          <Box
            mt={{ xs: 7.5, md: 12 }}
            px={{ xs: 2.5, md: 7.5 }}
            py={{ xs: 3.75, md: 5 }}
            bgcolor={white}
          >
            <Stack rowGap={3.75}>
              <Box
                width="150px"
                height="150px"
                overflow="hidden"
                position="relative"
                borderRadius="100%"
                border={`3px solid ${rawSienna}`}
              >
                <img
                  src={DefaultAvatar}
                  alt={full_name}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
              <Box>
                <Typography color={alpha(darkCharcoal, 0.5)} mb={1.25}>
                  Username:{" "}
                </Typography>
                <Typography variant="h3">{username}</Typography>
              </Box>
              <Box>
                <Typography color={alpha(darkCharcoal, 0.5)} mb={1.25}>
                  Full Name:{" "}
                </Typography>
                <Typography>{full_name}</Typography>
              </Box>
              <Box>
                <Typography color={alpha(darkCharcoal, 0.5)} mb={1.25}>
                  Email Address:{" "}
                </Typography>
                <Typography>{email_address}</Typography>
              </Box>
            </Stack>
          </Box>
          <Box
            width="100%"
            mt={{ xs: 7.5, md: 12 }}
            px={{ xs: 2.5, md: 7.5 }}
            py={{ xs: 3.75, md: 5 }}
            bgcolor={white}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
            >
              <Typography fontSize="24px" fontWeight={600}>
                Your Cars For Rent
              </Typography>

              <Button label="Add New Car" variant="filled" to="/add-car" />
            </Stack>

            <Grid container spacing={3.75} mt={1.5}>
              {cars.length <= 0 ? (
                <Grid item xs={12}>
                  <Typography color={alpha(darkCharcoal, 0.5)}>
                    You have no cars for rent click add new car now!
                  </Typography>
                </Grid>
              ) : (
                cars.map((car) => (
                  <>
                    <Grid item xs={12} sm={6} lg={2} key={car._id}>
                      <CarCard data={car} link={`/vehicles/${car._id}`} />
                    </Grid>
                  </>
                ))
              )}
            </Grid>
          </Box>
        </Stack>
      </Box>
    </ContentContainer>
  );
}
