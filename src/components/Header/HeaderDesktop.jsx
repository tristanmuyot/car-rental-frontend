import {
  AppBar,
  Box,
  Typography,
  alpha,
  styled,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../Button";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const NAVBAR_DESKTOP_HEIGHT = 90;
export const NAVBAR_DESKTOP_HEIGHT_STICKY = 60;

const StyledAppBar = styled(AppBar)(() => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  height: `${NAVBAR_DESKTOP_HEIGHT}px`,
  transition: "0.2s ease-in-out",
}));

export default function HeaderDesktop() {
  const theme = useTheme();
  const { darkCharcoal, white } = theme.palette.common;
  const location = useLocation();
  const [loggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
  });

  useEffect(() => {
    const userdata = window.localStorage.getItem("user");
    if (userdata) {
      setLoggedin(true);
      setUser(JSON.parse(userdata));
    } else {
      setLoggedin(false);
    }
  }, [location]);

  return (
    <StyledAppBar
      elevation={0}
      sx={{
        backgroundColor: scrollTrigger ? "#F6F6F6" : white,
        color: darkCharcoal,
        borderBottom: scrollTrigger
          ? `0.5px solid ${alpha(darkCharcoal, 0.1)}`
          : "none",
        height: scrollTrigger
          ? `${NAVBAR_DESKTOP_HEIGHT_STICKY}px`
          : NAVBAR_DESKTOP_HEIGHT,
      }}
    >
      <Box pl={{ xs: 2.5, md: 7.5 }}>
        <NavLink to="/">
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              fontSize: scrollTrigger ? 30 : 40,
              transition: "0.3S ease-in-out",
            }}
          >
            CARPLEX
          </Typography>
        </NavLink>
      </Box>
      <Box
        height="100%"
        pr={{ xs: 2.5, md: 7.5 }}
        display="flex"
        justifyContent="flex-end"
        columnGap={4.5}
        alignItems="center"
      >
        <NavLink to="/vehicles">
          <Typography>Vehicles</Typography>
        </NavLink>
        <NavLink to="/contact">
          <Typography>Contact</Typography>
        </NavLink>
        {loggedin ? (
          <>
            <Typography
              sx={{ textTransform: "capitalize", cursor: "pointer" }}
              onClick={handleClick}
            >
              {user.data.username}
            </Typography>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <NavLink to="/profile">Profile</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/booking-list">My Bookings</NavLink>
              </MenuItem>
              {user.data.role === "admin" && (
                <MenuItem onClick={handleClose}>
                  <NavLink to="/admin">Manage</NavLink>
                </MenuItem>
              )}
            </Menu>
            <Button
              label="Logout"
              variant="filled"
              onClick={() => {
                setLoggedin(false);
                window.localStorage.removeItem("user");
                setUser(null);
                window.location.href = "/";
              }}
            />
          </>
        ) : (
          <Button label="Sign In" to="/sign-in" variant="filled" />
        )}
      </Box>
    </StyledAppBar>
  );
}
