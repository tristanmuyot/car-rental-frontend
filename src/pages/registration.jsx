import {
  Box,
  Stack,
  TextField,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ContentContainer from "../components/ContentContainer";
import { NAVBAR_DESKTOP_HEIGHT } from "../components/Header/HeaderDesktop";
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import register from "../utils/register";

export default function SignUpPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { darkCharcoal, rawSienna } = theme.palette.common;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const dataFields = Object.fromEntries(formData);

    const loginresp = await register(dataFields);

    if (loginresp.error) {
      setError(loginresp.error);
    } else {
      window.localStorage.setItem("user", JSON.stringify(loginresp));
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <ContentContainer>
      <Box
        bgcolor="#F6F6F6"
        minHeight={`calc(100vh - ${NAVBAR_DESKTOP_HEIGHT}px - 157px)`}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          px={{ xs: 2.5, md: 7.5 }}
          maxWidth={{ xs: "100%", md: "800px" }}
          width="100%"
          p={3.75}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h3" mb={3.75} color={darkCharcoal}>
              Sign <span style={{ color: rawSienna }}>Up</span>
            </Typography>
            <Stack direction={{ xs: "column", md: "row" }} columnGap={2.5}>
              <TextField
                fullWidth
                placeholder="Full Name"
                name="full_name"
                sx={{ marginBottom: 2.5 }}
                required
              />
              <TextField
                fullWidth
                placeholder="Email"
                name="email_address"
                type="email"
                sx={{ marginBottom: 2.5 }}
                required
              />
            </Stack>
            <TextField
              fullWidth
              placeholder="Username"
              name="username"
              sx={{ marginBottom: 2.5 }}
              required
            />
            <TextField
              fullWidth
              placeholder="********"
              type="password"
              name="password"
              sx={{ marginBottom: 2.5 }}
              required
            />
            <Typography mb={2.5} color={alpha(darkCharcoal, 0.3)}>
              {"Already have an account?"} &nbsp;
              <NavLink
                to="/sign-in"
                style={{ textDecoration: "underline", color: rawSienna }}
              >
                Sign In
              </NavLink>
            </Typography>

            <Stack
              direction={{ xs: "column", md: "row" }}
              columnGap={2}
              rowGap={2}
            >
              <Button type="submit" label="Sign up" loading={loading} />
              {!!error && (
                <Typography color="red" mt={2.5}>
                  {error}
                </Typography>
              )}
            </Stack>
          </form>
        </Box>
      </Box>
    </ContentContainer>
  );
}
