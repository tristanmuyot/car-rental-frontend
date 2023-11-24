import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/global.css";
import HomePage from "./pages/homePage";
import SignInPage from "./pages/signInPage";
import Header from "./components/Header/Header";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Footer from "./components/Footer";
import SignUpPage from "./pages/registration";
import ProfilePage from "./pages/profilePage";
import AddCarForRentPage from "./pages/createCarPage";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Header />
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/sign-in" Component={SignInPage} />
            <Route path="/sign-up" Component={SignUpPage} />
            <Route path="/profile" Component={ProfilePage} />
            <Route path="/add-car" Component={AddCarForRentPage} />
          </Routes>
          <Footer />
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
