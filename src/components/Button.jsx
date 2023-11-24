import { Button as ButtonUnstyled } from "@mui/base";
import { Box, CircularProgress, styled, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

const OutlinedButton = styled(ButtonUnstyled)(({ theme }) => ({
  border: `1px solid ${theme.palette.common.rawSienna}`,
  color: theme.palette.common.rawSienna,
  background: "transparent",
  padding: `${theme.spacing(1.25)} ${theme.spacing(2.5)}`,
  cursor: "pointer",
  transition: "0.3s ease-in-out",
  fontFamily: '"Anton", sans-serif',
  textTransform: "uppercase",
  fontSize: "16px",

  "&:hover": {
    background: theme.palette.common.rawSienna,
    color: theme.palette.common.white,
  },
}));

const FilledButton = styled(ButtonUnstyled)(({ theme }) => ({
  color: theme.palette.common.white,
  background: theme.palette.common.rawSienna,
  padding: `${theme.spacing(1.25)} ${theme.spacing(2.5)}`,
  cursor: "pointer",
  border: `1px solid ${theme.palette.common.rawSienna}`,
  transition: "0.3s ease-in-out",
  fontFamily: '"Anton", sans-serif',
  textTransform: "uppercase",
  fontSize: "16px",

  "&:hover": {
    background: "transparent",
    color: theme.palette.common.rawSienna,
  },
}));

export default function Button(props) {
  const { label, to, variant = "outlined", loading, ...restProps } = props;
  const theme = useTheme();
  const { rawSienna } = theme.palette.common;

  let button = <OutlinedButton {...restProps}>{label}</OutlinedButton>;

  if (loading) {
    return (
      <Box minHeight="46px">
        <CircularProgress size={20} sx={{ color: rawSienna }} />
      </Box>
    );
  }

  if (variant === "filled") {
    button = <FilledButton {...restProps}>{label}</FilledButton>;
  }

  if (!to) {
    return button;
  }

  return <NavLink to={to}>{button}</NavLink>;
}
