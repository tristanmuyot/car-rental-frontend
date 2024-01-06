import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ContentContainer from "../components/ContentContainer";
import { NAVBAR_DESKTOP_HEIGHT } from "../components/Header/HeaderDesktop";

import getBookingByUserId from "../utils/getBookingsByUserId";
import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";

export default function BookingList() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const theme = useTheme();
  const { darkCharcoal, white } = theme.palette.common;

  useEffect(() => {
    setLoading(true);

    const userdata = window.localStorage.getItem("user");
    if (userdata) {
      const userData = JSON.parse(userdata);
      getBookingByUserId(userData.data._id)
        .then((response) => {
          setBookings(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);
  console.log(bookings);

  return (
    <ContentContainer>
      <Box
        bgcolor="#F6F6F6"
        minHeight={`calc(100vh - ${NAVBAR_DESKTOP_HEIGHT}px - 157px)`}
        py={{ xs: 7.5, md: 12.5 }}
        alignItems="center"
        px={{ xs: 2.5, md: 7.5 }}
      >
        <Typography variant="h1" mb={8}>
          Booked Vehicle(s)
        </Typography>
        <Stack width="100%" rowGap={3.75} alignItems="flex-start">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {bookings && bookings.length <= 0 ? (
                <Typography color={alpha(darkCharcoal, 0.5)}>
                  No Bookings
                </Typography>
              ) : (
                bookings.map((booking) => (
                  <Stack
                    key={booking._id}
                    direction={{ xs: "column", md: "row" }}
                    width="100%"
                    columnGap={4}
                    bgcolor={white}
                    padding={5}
                  >
                    <Box width={{ xs: "100%", md: "30%" }}>
                      <CarCard data={booking.car} />
                    </Box>
                    <Box width={{ xs: "100%", md: "70%" }}>
                      <Stack rowGap={2}>
                        <Typography>
                          Pick up date: {booking?.pick_up_date}
                        </Typography>
                        <Typography>
                          Return Date: {booking?.return_date}
                        </Typography>
                        <Typography>
                          Pick up location: {booking?.car.pickup_location}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                ))
              )}
            </>
          )}
        </Stack>
      </Box>
    </ContentContainer>
  );
}
