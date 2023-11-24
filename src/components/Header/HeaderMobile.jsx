import {
  AppBar,
  Box,
  Divider,
  Stack,
  Typography,
  alpha,
  styled,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import BurgerMenuIconSVG from "../svgs/BurgerMenu";
import CloseIconSVG from "../svgs/CloseIcon";
import { useState } from "react";

export const NAVBAR_DESKTOP_HEIGHT = 90;
export const NAVBAR_DESKTOP_HEIGHT_STICKY = 60;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "transparent",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  height: `${NAVBAR_DESKTOP_HEIGHT}px`,
  transition: "0.2s ease-in-out",
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
}));

export default function HeaderMobile() {
  const theme = useTheme();
  const { darkCharcoal, rawSienna, white } = theme.palette.common;
  const [open, setOpen] = useState(false);

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
  });

  return (
    <>
      <StyledAppBar
        elevation={0}
        sx={{
          backgroundColor: scrollTrigger ? "#F6F6F6" : white,
          color: open ? white : darkCharcoal,
          borderBottom: scrollTrigger
            ? `0.5px solid ${alpha(darkCharcoal, 0.1)}`
            : "none",
          height: scrollTrigger
            ? `${NAVBAR_DESKTOP_HEIGHT_STICKY}px`
            : NAVBAR_DESKTOP_HEIGHT,
        }}
      >
        <Box>
          <NavLink to="/">
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                fontSize: scrollTrigger ? 20 : 30,
                transition: "0.3S ease-in-out",
              }}
            >
              CARPLEX
            </Typography>
          </NavLink>
        </Box>
        <Box
          sx={{
            width: scrollTrigger ? 20 : 25,
            transition: "0.3S ease-in-out",
            cursor: "pointer",
            color: open ? white : darkCharcoal,
          }}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <CloseIconSVG width="100%" height="100%" />
          ) : (
            <BurgerMenuIconSVG width="100%" height="100%" />
          )}
        </Box>
      </StyledAppBar>

      <Box
        position="fixed"
        width="100%"
        height="100%"
        bgcolor={rawSienna}
        zIndex={1001}
        pt={15}
        px={2.5}
        pb={7.5}
        sx={{
          transform: `translate3d(${open ? "0" : "100%"}, 0, 0)`,
          transition: "0.4s ease-in-out",
        }}
      >
        <Stack color={white} rowGap={3.75}>
          <NavLink>
            <Typography fontSize="24px">Vehicles</Typography>
          </NavLink>
          <Divider sx={{ borderColor: alpha(white, 0.3) }} />
          <NavLink>
            <Typography fontSize="24px">Contact</Typography>
          </NavLink>
        </Stack>
      </Box>
    </>
  );
}
