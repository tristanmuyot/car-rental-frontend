import { useMediaQuery, useTheme } from "@mui/material";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export default function Header() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("md"));

  if (isTablet) {
    return <HeaderDesktop />;
  }

  return <HeaderMobile />;
}
