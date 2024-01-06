import {
  Box,
  Stack,
  TextField,
  Typography,
  
  useTheme,
} from "@mui/material";
import ContentContainer from "../components/ContentContainer";
import { NAVBAR_DESKTOP_HEIGHT } from "../components/Header/HeaderDesktop";
import Button from "../components/Button";

export default function ContactPage() {
  const theme = useTheme();
  const { darkCharcoal,} = theme.palette.common;

  return (
    <ContentContainer>
      
      <Box
      
        bgcolor="#F6F6F6"
        minHeight={`calc(100vh - ${NAVBAR_DESKTOP_HEIGHT}px - 157px)`}
        py={{ xs: 7.5, md: 12.5 }}
        alignItems="center"
        px={{ xs: 2.5, md: 7.5 }}
      >
           <Typography variant="h3" mb={3.75} color={darkCharcoal}>
                  Contact us
                </Typography>
                <Typography mb={3.75} color="orangered">
                  * Kindly be aware that your contact information will be use only for the Carplex services.
                </Typography>
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          width="100%"
          columnGap={7.5}
          rowGap={7.5}
          alignItems="flex-start"
        >
          <Box
          width={{ xs: "100%", md: "50%" }}
          >
            <form>
              <Box width="100%">
                <TextField
                  fullWidth
                  placeholder="Full Name"
                  name="name"
                  sx={{ marginBottom: 2.5 }}
                />
                <Stack direction={{ xs: "column", md: "row" }} columnGap={2.5}>
                  <TextField
                    fullWidth
                    placeholder="Contact Number"
                    name="number"
                    sx={{ marginBottom: 2.5 }}
                    required
                  />

                  <TextField
                    fullWidth
                    placeholder="E-mail"
                    name="email"
                    sx={{ marginBottom: 2.5 }}
                    required
                  />

                </Stack>

                <TextField
                  fullWidth
                  placeholder="Inquiries"
                  name="inquiries"
                  sx={{ marginBottom: 2.5 }}
                  required
                  multiline
                  rows= {4}
                />

                <Stack
                  direction={{ xs: "column", md: "row" }}
                  columnGap={2}
                  rowGap={2}
                >
                  <Button type="submit" label="Submit" />
                </Stack>
              </Box>
            </form>
          </Box>
          <Box>
          <Stack rowGap={2.5}>
              <Typography>
                  Email Address: <a href="mailto:Inquiry@Carplex.com">Inquiry@Carplex.com</a>
              </Typography>
              <Typography>
                  Contact Number: <a href="tel:098728273827">098728273827</a>
              </Typography>
              <Typography>
              Office Address: 123 Brgy. Sitio 456 Cabanatuan City
              </Typography>
          </Stack>
        </Box>
        </Stack>
      </Box>
    </ContentContainer>
  );
}
