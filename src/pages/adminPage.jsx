import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ContentContainer from "../components/ContentContainer";
import { NAVBAR_DESKTOP_HEIGHT } from "../components/Header/HeaderDesktop";

import CarCard from "../components/CarCard";
import { useEffect, useState } from "react";
import getCars from "../utils/getCars";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteCar from "../utils/deleteCars";

export default function AdminPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { darkCharcoal, white } = theme.palette.common;
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const handleDelete = async () => {
    setDeleteLoading(true);
    await deleteCar(selectedCar);
    setDeleteLoading(false);
    getVehicles();
    setSelectedCar(null);
    setOpen(false);
  };

  const handleClickOpen = (id) => {
    setSelectedCar(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getVehicles = () => {
    setLoading(true);

    getCars()
      .then((carsx) => {
        setCars(carsx.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="error" fontWeight={800}>
          {"WARNING!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            are you sure you want to delete this vehicle?
          </DialogContentText>
        </DialogContent>
        {deleteLoading ? (
          <CircularProgress />
        ) : (
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleDelete} autoFocus>
              Agree
            </Button>
          </DialogActions>
        )}
      </Dialog>
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
                  Available Vehicles
                </Typography>
              </Stack>
              {loading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={3.75} mt={1.5}>
                  {cars.length <= 0 ? (
                    <Grid item xs={12}>
                      <Typography color={alpha(darkCharcoal, 0.5)}></Typography>
                    </Grid>
                  ) : (
                    cars.map((car) => (
                      <>
                        <Grid item xs={12} sm={6} lg={4} key={car._id}>
                          <CarCard data={car} />
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{ mt: 2.5 }}
                            startIcon={<DeleteIcon />}
                            onClick={() => handleClickOpen(car._id)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </>
                    ))
                  )}
                </Grid>
              )}
            </Box>
          </Stack>
        </Box>
      </ContentContainer>
    </>
  );
}
