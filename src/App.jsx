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
import VehiclesPage from "./pages/vehiclesPage";
import ContactPage from "./pages/contactPage";
import VehiclePage from "./pages/vehiclePage";
import AdminPage from "./pages/adminPage";
import BookingList from "./pages/bookingList";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Header />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add-car" element={<AddCarForRentPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/vehicles/:id" element={<VehiclePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/booking-list" element={<BookingList />} />
          </Routes>
          <Footer />
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
