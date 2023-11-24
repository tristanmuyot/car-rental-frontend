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
import login from "../utils/login";

export default function SignInPage() {
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

    const loginresp = await login(dataFields);

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
        <form onSubmit={handleSubmit}>
          <Box
            px={{ xs: 2.5, md: 7.5 }}
            maxWidth={{ xs: "100%", md: "700px" }}
            width="100%"
            p={3.75}
          >
            <Typography variant="h3" mb={3.75} color={darkCharcoal}>
              Sign <span style={{ color: rawSienna }}>In</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="Username"
              name="username"
              sx={{ marginBottom: 2.5 }}
            />
            <TextField
              fullWidth
              placeholder="********"
              type="password"
              name="password"
              sx={{ marginBottom: 2.5 }}
            />
            <Typography mb={2.5} color={alpha(darkCharcoal, 0.3)}>
              {"Don't have an account yet?"} &nbsp;
              <NavLink
                to="/sign-up"
                style={{ textDecoration: "underline", color: rawSienna }}
              >
                Create One
              </NavLink>
            </Typography>

            <Stack
              direction={{ xs: "column", md: "row" }}
              columnGap={2}
              rowGap={2}
            >
              <Button type="submit" label="Sign in" loading={loading} />
              {!!error && (
                <Typography color="red" mt={2.5}>
                  {error}
                </Typography>
              )}
            </Stack>
          </Box>
        </form>
      </Box>
    </ContentContainer>
  );
}
