import {
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Button from "../components/Button";

import Cross from "../assets/images/cross.png";
import Photo1 from "../assets/images/photo1.png";
import LocationIconSVG from "../components/svgs/Location";
import MapBg from "../assets/images/map-bg.png";
import CTABg from "../assets/images/cta.jpg";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { register } from "swiper/element/bundle";
import CityCard from "../components/CityCard";
import { useEffect, useState } from "react";
import getCars from "../utils/getCars";

register();

function HeroSection() {
  const theme = useTheme();
  const { rawSienna, white, darkCharcoal } = theme.palette.common;
  const isTablet = useMediaQuery(theme.breakpoints.up("md"));

  const datePickerStyle = {
    ".MuiInputBase-input": { color: white },
    ".MuiInputBase-root": {
      height: "40px",
    },
  };
  return (
    <Box
      pt={{ xs: 12, md: 18 }}
      px={{ xs: 2.5, md: 7.5 }}
      pb={7.5}
      bgcolor={white}
    >
      <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
        <Box
          color={darkCharcoal}
          width={{ xs: "100%", md: "40%" }}
          position="relative"
          zIndex={2}
        >
          {!isTablet && (
            <Box
              width={{ xs: "100%", md: "60%" }}
              pr={{ xs: 2.5, md: 7.5 }}
              position="relative"
              zIndex={1}
              mb={7.5}
            >
              <Box
                width="60%"
                height="90%"
                bgcolor={rawSienna}
                position="absolute"
                right="0"
                top="50%"
                zIndex={1}
                sx={{
                  transform: "translateY(-50%)",
                }}
              />
              <img
                src={Cross}
                alt="Toyota Innova"
                width="100%"
                style={{ zIndex: 2, position: "relative" }}
              />
            </Box>
          )}
          <Typography
            variant="h1"
            maxWidth={{ xs: "100%", md: "482px" }}
            pb={{ xs: 2.5, md: 5 }}
          >
            Find the best <span style={{ color: rawSienna }}>ride</span> for
            your next visit
          </Typography>
          <Typography variant="h4">For As Low As PHP 150</Typography>
          <Typography color={alpha(darkCharcoal, 0.5)} pb={5}>
            Per Day
          </Typography>
          <Stack direction="row" alignItems="center" columnGap={2} mb={5}>
            <Button label="Rent Now" />
            <Typography color={alpha(darkCharcoal, 0.5)}>OR</Typography>
            <Button label="Be Rented" />
          </Stack>
          <Stack
            width={{ xs: "100%", md: "120%" }}
            maxWidth="700px"
            bgcolor={rawSienna}
            p={2.25}
            justifyContent="space-between"
            direction={{ xs: "column", md: "row" }}
            rowGap={2}
            sx={{
              willChange: "transform",
              backdropFilter: "blur(10px)",
              alignItems: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Box>
              <Typography color={white} mb={1.25}>
                Pick Up Date
              </Typography>
              <DatePicker sx={datePickerStyle} />
            </Box>
            {isTablet && (
              <Divider
                orientation="vertical"
                sx={{ borderColor: alpha(white, 0.3) }}
                flexItem
              />
            )}
            <Box>
              <Typography color={white} mb={1.25}>
                Return Date
              </Typography>
              <DatePicker sx={datePickerStyle} />
            </Box>
            <Button
              label="Search"
              sx={{ height: "fit-content", color: white, borderColor: "white" }}
            />
          </Stack>
        </Box>
        {isTablet && (
          <Box
            width={{ xs: "100%", md: "60%" }}
            pr={{ xs: 2.5, md: 7.5 }}
            position="relative"
            zIndex={1}
          >
            <Box
              width="60%"
              height="90%"
              bgcolor={rawSienna}
              position="absolute"
              right="0"
              top="50%"
              zIndex={1}
              sx={{
                transform: "translateY(-50%)",
              }}
            />
            <img
              src={Cross}
              alt="Toyota Innova"
              width="100%"
              style={{ zIndex: 2, position: "relative" }}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}

function PopularVehiclesSection() {
  const theme = useTheme();
  const { rawSienna, white } = theme.palette.common;

  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars()
      .then((cars) => {
        setCars(cars.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box position="relative">
      <Box
        zIndex="1"
        left="50%"
        right="50%"
        position="absolute"
        width="246px"
        height="100%"
        bgcolor={rawSienna}
        sx={{ transform: "translateX(-50%)" }}
      />
      <Box textAlign="center" position="relative" zIndex="2" pt={12} pb={22}>
        <Typography color={alpha(white, 0.5)}>EXPLORE</Typography>
        <Typography color={white} variant="h2" mb={15}>
          POPULAR VEHICLES
        </Typography>

        <swiper-container
          slides-per-view="3"
          space-between="60px"
          centered-slides="true"
          loop="true"
        >
          {cars.map((car) => (
            <swiper-slide key={car._id}>
              <img src={car.image_url} alt="car" width="100%" />
            </swiper-slide>
          ))}
        </swiper-container>
      </Box>
    </Box>
  );
}

function ContentAndImage() {
  const theme = useTheme();
  const { white, darkCharcoal, rawSienna } = theme.palette.common;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      py={{ xs: 7.5, md: 12.5 }}
      bgcolor={white}
      px={{ xs: 2.5, md: 7.5 }}
      columnGap={7.5}
      rowGap={3.75}
    >
      <Box width={{ xs: "100%", md: "50%" }}>
        <Typography color={alpha(darkCharcoal, 0.5)} mb={1}>
          EXPLORE
        </Typography>
        <Typography
          variant="h2"
          maxWidth={{ xs: "100%", md: "482px" }}
          pb={3.75}
        >
          Simple booking <span style={{ color: rawSienna }}>process</span>
        </Typography>
        <Typography color={darkCharcoal} mb={3.75}>
          Booking your rental car with us is easy and convenient. Our
          user-friendly online platform allows you to browse through our
          selection, choose your desired vehicle, and make reservations
          effortlessly. Need assistance or have special requests? Our dedicated
          customer service team is just a call away, ready to assist you every
          step of the way.
        </Typography>
        <Button label="Book Now" />
      </Box>
      <Box width={{ xs: "100%", md: "50%" }}>
        <img src={Photo1} alt="People with cars" width="100%" />
      </Box>
    </Stack>
  );
}

function FindCarByCity() {
  const theme = useTheme();
  const { white, rawSienna, darkCharcoal } = theme.palette.common;

  return (
    <Box
      py={{ xs: 7.5, md: 21.25 }}
      px={{ xs: 2.5, md: 7.5 }}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        left="0"
        top="0"
        width="100%"
        height="100%"
        zIndex={1}
        sx={{
          pointerEvents: "none",
        }}
      >
        <img
          src={MapBg}
          alt="map"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            opacity: 0.5,
          }}
        />
      </Box>

      <Box
        position="absolute"
        bottom="0"
        width="100%"
        height="100%"
        left="0"
        zIndex={2}
        sx={{
          background: `linear-gradient(to top, ${darkCharcoal}, ${alpha(
            darkCharcoal,
            0
          )})`,
        }}
      />

      <Box
        color={white}
        position="relative"
        zIndex={3}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          width="100%"
        >
          <Box width="64px" height="64px" mb={3.5} color={rawSienna}>
            <LocationIconSVG />
          </Box>
          <Typography
            variant="h2"
            maxWidth={{ xs: "100%", md: "482px" }}
            pb={3.75}
          >
            Find<span style={{ color: rawSienna }}>car</span> by City
          </Typography>
          <TextField
            type="text"
            fullWidth
            placeholder="Enter City..."
            sx={{
              maxWidth: "600px",
              ".MuiOutlinedInput-input": {
                color: white,
              },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: `${alpha(white, 0.3)} !important`,
                borderWidth: "0.5px !important",
                borderRadius: 0,
                backgroundColor: alpha(white, 0.05),
              },
            }}
          />

          <Grid container spacing={2.5} mt={{ xs: 3.75, md: 7.5 }}>
            <Grid item xs={12} md={3}>
              <CityCard
                title="Cabanatuan"
                availability={5}
                link="/cabanatuan"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <CityCard title="Manila" availability={5} link="/cabanatuan" />
            </Grid>
            <Grid item xs={12} md={3}>
              <CityCard
                title="Cabanatuan"
                availability={5}
                link="/cabanatuan"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <CityCard
                title="Cabanatuan"
                availability={5}
                link="/cabanatuan"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

function CarBrands() {
  const theme = useTheme();
  const { white } = theme.palette.common;

  return <Box bgcolor={white} py={12.5} px={{ xs: 2.5, md: 7.5 }}></Box>;
}

function CTASection() {
  const theme = useTheme();
  const { white, rawSienna } = theme.palette.common;

  return (
    <Box
      bgcolor={white}
      py={12.5}
      px={{ xs: 2.5, md: 7.5 }}
      minHeight={{ xs: "30vh", md: "65vh" }}
      width="100%"
      height="100%"
      position="relative"
    >
      <Box
        position="absolute"
        left="0"
        top="0"
        width="100%"
        height="100%"
        zIndex={1}
        sx={{
          pointerEvents: "none",
        }}
      >
        <img
          src={CTABg}
          alt="map"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      <Box
        position="relative"
        zIndex={2}
        color={white}
        width="100%"
        height="100%"
      >
        <Typography
          variant="h4"
          fontSize={{ xs: "24px", md: "60px" }}
          maxWidth={{ xs: "100%", md: "800px" }}
          mb={3.75}
        >
          Start Your Journey Today! Book Your Perfect Ride with{" "}
          <span style={{ color: rawSienna }}>CARPLEX</span>
        </Typography>
        <Button
          label="BOOK NOW"
          sx={{
            width: "max-content",
            fontSize: 24,
          }}
        />
      </Box>
    </Box>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularVehiclesSection />
      <ContentAndImage />
      <FindCarByCity />
      <CarBrands />
      <CTASection />
    </>
  );
}
