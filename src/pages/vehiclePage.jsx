import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ContentContainer from "../components/ContentContainer";
import { NAVBAR_DESKTOP_HEIGHT } from "../components/Header/HeaderDesktop";
import Button from "../components/Button";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getCarById from "../utils/getCarById";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import book from "../utils/book";

export default function VehiclePage() {
  const theme = useTheme();
  const { darkCharcoal, lightGray } = theme.palette.common;
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState(undefined);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const handleBookNow = async () => {
    setBookingLoading(true);
    const bookingData = {
      user: user.data._id,
      car: carData._id,
      pick_up_date: pickupDate.format("MMM-DD-YYYY"),
      return_date: returnDate.format("MMM-DD-YYYY"),
      number_of_days: getNumberOfDays(),
      total_amount: getTotalAmount(),
    };
    await book(bookingData);
    setBookingLoading(false);
    handleClickOpen();
  };
  useEffect(() => {
    setLoading(true);

    getCarById(id)
      .then((carsx) => {
        setCarData(carsx.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    const userdata = window.localStorage.getItem("user");
    if (userdata) {
      setUser(JSON.parse(userdata));
    }
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const datePickerStyle = {
    ".MuiInputBase-input": { color: darkCharcoal },
    ".MuiInputBase-root": {
      height: "40px",
    },
  };

  const getNumberOfDays = () => {
    if (dayjs(pickupDate).isValid() && dayjs(returnDate).isValid()) {
      return returnDate.diff(pickupDate, "days");
    }

    return 0;
  };
  const getTotalAmount = () => {
    if (getNumberOfDays() && carData) {
      return getNumberOfDays() * carData.rate.price_raw;
    }
    return 0;
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="seagreen" fontWeight={800}>
          {"Confirmed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thank you!!Your Booking has Confirmed, please coordinate with the
            owner of the vehicle for any questions and inquiries.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <NavLink to="/booking-list">
            <Typography p={2.5} fontSize={18}>
              OK
            </Typography>
          </NavLink>
        </DialogActions>
      </Dialog>
      <ContentContainer>
        <Box
          bgcolor="#F6F6F6"
          minHeight={`calc(100vh - ${NAVBAR_DESKTOP_HEIGHT}px - 157px)`}
          py={{ xs: 7.5, md: 12.5 }}
          alignItems="center"
          px={{ xs: 2.5, md: 7.5 }}
        >
          <Typography variant="h2" mb={3.75} color={darkCharcoal}>
            Book now!!
          </Typography>
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            width="100%"
            columnGap={7.5}
            rowGap={7.5}
            alignItems="flex-start"
          >
            <Box width={{ xs: "100%", md: "50%" }}>
              <form>
                <Box width="100%">
                  <TextField
                    fullWidth
                    placeholder="Full Name"
                    sx={{ marginBottom: 2.5 }}
                    value={user?.data.full_name}
                    disabled
                  />
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    columnGap={2.5}
                  >
                    <TextField
                      fullWidth
                      placeholder="Contact Number"
                      value={user?.data.contact_number}
                      disabled
                    />

                    <TextField
                      fullWidth
                      placeholder="E-mail"
                      value={user?.data.email_address}
                      disabled
                    />
                  </Stack>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    columnGap={2}
                    rowGap={2}
                    mb={2.5}
                    mt={2.5}
                  >
                    <Box width={{ xs: "100%", md: "50%" }}>
                      <Typography color={lightGray} mb={1.25}>
                        Pick Up Date
                      </Typography>
                      <DatePicker
                        disablePast
                        onChange={(value) => setPickupDate(value)}
                        sx={datePickerStyle}
                        slotProps={{
                          textField: {
                            sx: {
                              width: "100%",
                            },
                          },
                        }}
                      />
                    </Box>
                    <Box width={{ xs: "100%", md: "50%" }}>
                      <Typography color={lightGray} mb={1.25}>
                        Return date
                      </Typography>
                      <DatePicker
                        onChange={(value) => setReturnDate(value)}
                        sx={datePickerStyle}
                        minDate={pickupDate ? pickupDate.add(1, "day") : null}
                        disabled={!pickupDate}
                        slotProps={{
                          textField: {
                            sx: {
                              width: "100%",
                            },
                          },
                        }}
                      />
                    </Box>
                  </Stack>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    columnGap={2}
                    rowGap={2}
                    alignItems="center"
                    mb={2.5}
                  >
                    <Typography>
                      Number of Day(s): {getNumberOfDays()}
                    </Typography>
                    <Typography>Total Amount: {getTotalAmount()}</Typography>
                  </Stack>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    columnGap={2}
                    rowGap={2}
                    alignItems="center"
                  >
                    <Button
                      type="submit"
                      label="Confirm"
                      onClick={handleBookNow}
                      loading={bookingLoading}
                    />
                  </Stack>
                </Box>
              </form>
            </Box>
            <Box width={{ xs: "100%", md: "50%" }}>
              <Typography variant="h2" mb={3.75} color={darkCharcoal}>
                Vehicle details
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                <Stack rowGap={2}>
                  <Typography>Car Name: {carData?.name}</Typography>
                  <Typography>Rate: {carData?.rate.price_formatted}</Typography>
                  <Typography>Brand: {carData?.brand}</Typography>
                  <Typography>Year Model: {carData?.year_model}</Typography>
                  <Typography>Transmission: {carData?.transmission}</Typography>
                  <Typography>Description: {carData?.description}</Typography>
                  <Typography>
                    Pick Up Location: {carData?.description}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Stack>
        </Box>
      </ContentContainer>
    </>
  );
}
