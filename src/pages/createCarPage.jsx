import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ContentContainer from "../components/ContentContainer";
import { NAVBAR_DESKTOP_HEIGHT } from "../components/Header/HeaderDesktop";
import Button from "../components/Button";
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import createCar from "../utils/createCar";
import { useNavigate } from "react-router-dom";
import getCities from "../utils/getCities";

export default function AddCarForRentPage() {
  const theme = useTheme();
  const { darkCharcoal, white, rawSienna } = theme.palette.common;
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("user"));
  const navigate = useNavigate();
  const [cities, setCities] = useState(undefined);
  console.log(cities);
  useEffect(() => {
    getCities()
      .then((response) => {
        setCities(response[0].city);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleFileDrop = (files) => {
    console.log(files);
    setFile(files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const dataFields = Object.fromEntries(formData);

    const newFormData = new FormData();

    newFormData.append("image", file);
    newFormData.append(
      "details",
      JSON.stringify({
        ...dataFields,
        owner: user.data._id,
      })
    );

    const createResp = await createCar(newFormData);

    if (createResp.error) {
      setError(createResp.error);
    } else {
      navigate("/profile");
    }
  };

  return (
    <ContentContainer>
      <Box
        bgcolor="#F6F6F6"
        minHeight={`calc(100vh - ${NAVBAR_DESKTOP_HEIGHT}px - 157px)`}
        py={{ xs: 7.5, md: 12.5 }}
        display="flex"
        alignItems="center"
        px={{ xs: 2.5, md: 7.5 }}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          width="100%"
          columnGap={7.5}
          rowGap={7.5}
          alignItems="flex-start"
        >
          <Box
            width={{ xs: "100%", md: "50%" }}
            bgcolor={white}
            p={{ xs: 3.75, md: 5 }}
          >
            <form onSubmit={handleSubmit}>
              <Box width="100%">
                <Typography variant="h3" mb={3.75} color={darkCharcoal}>
                  Request your new <span style={{ color: rawSienna }}>car</span>{" "}
                  for rent
                </Typography>
                <Typography mb={3.75} color="orangered">
                  * Kindly be aware that your submission will require review by
                  our team. We appreciate your patience in this process!
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Car Name"
                  name="name"
                  sx={{ marginBottom: 2.5 }}
                />
                <Stack direction={{ xs: "column", md: "row" }} columnGap={2.5}>
                  <TextField
                    fullWidth
                    placeholder="Brand (eg. Toyota)"
                    name="brand"
                    sx={{ marginBottom: 2.5 }}
                    required
                  />
                  <Select
                    defaultValue="Automatic"
                    sx={{ width: "100%", height: "53.13px" }}
                    name="transmission"
                    required
                  >
                    <MenuItem value="Automatic">Automatic</MenuItem>
                    <MenuItem value="Manual">Manual</MenuItem>
                    <MenuItem value="EV">EV</MenuItem>
                  </Select>
                </Stack>

                <Select
                  defaultValue="0"
                  sx={{ width: "100%", height: "53.13px", marginBottom: 2.5 }}
                  name="city"
                  required
                >
                  <MenuItem value="0" disabled selected>
                    Select City
                  </MenuItem>
                  {cities !== undefined &&
                    cities.map((city) => {
                      return (
                        <MenuItem key={city.code} value={city.name}>
                          {city.name}
                        </MenuItem>
                      );
                    })}
                </Select>

                <TextField
                  fullWidth
                  placeholder="Rate (Per Day)"
                  name="price"
                  sx={{ marginBottom: 2.5 }}
                  required
                />
                <TextField
                  fullWidth
                  placeholder="Year model"
                  name="year_model"
                  sx={{ marginBottom: 2.5 }}
                  required
                />
                <TextField
                  fullWidth
                  placeholder="Pick Up Location"
                  name="pickup_location"
                  sx={{ marginBottom: 2.5 }}
                  required
                  multiline
                  rows={3}
                />
                <TextField
                  fullWidth
                  placeholder="Description"
                  name="description"
                  sx={{ marginBottom: 2.5 }}
                  required
                  multiline
                  rows={5}
                />

                <Stack
                  direction={{ xs: "column", md: "row" }}
                  columnGap={2}
                  rowGap={2}
                >
                  <Button type="submit" label="Create" loading={loading} />
                  {!!error && (
                    <Typography color="red" mt={2.5}>
                      {error}
                    </Typography>
                  )}
                </Stack>
              </Box>
            </form>
          </Box>
          <Box width={{ xs: "100%", md: "50%" }} display="grid">
            {file ? (
              <>
                <Typography
                  fontWeight={700}
                  justifySelf="flex-end"
                  color="red"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => setFile(undefined)}
                  mb={3.75}
                >
                  Remove
                </Typography>
                <img
                  src={URL.createObjectURL(file)}
                  style={{ width: "100%" }}
                />
              </>
            ) : (
              <Dropzone onDrop={handleFileDrop}>
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `5px dashed ${alpha(darkCharcoal, 0.5)}`,
                      cursor: "pointer",
                      minHeight: "150px",
                      padding: 2.5,
                      textAlign: "center",
                    }}
                  >
                    <input {...getInputProps()} />
                    <Typography
                      fontSize={{ xs: "16px", md: "24px" }}
                      fontWeight={700}
                      color={alpha(darkCharcoal, 0.5)}
                    >
                      {"Drag 'n'"} drop your image here, or click to select
                      files
                    </Typography>
                  </Box>
                )}
              </Dropzone>
            )}
          </Box>
        </Stack>
      </Box>
    </ContentContainer>
  );
}
