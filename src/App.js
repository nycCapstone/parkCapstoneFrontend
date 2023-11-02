import Nav from "./components/Nav/Nav";
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import Home from "./components/Dashboard/Home";
import Layout from "./components/Layout";
import Client from "./components/Client/Client";
import Admin from "./components/Dashboard/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Renter from "./components/Renter/Renter";
import RequireAuth from "./components/State/RequireAuth";
import PersistLogin from "./components/State/PersistLogin";
import { Routes, Route } from "react-router-dom";
import ConfirmEmail from "./components/Confirm/ConfirmEmail";
import ConfirmDetails from "./components/Confirm/ConfirmDetails";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer/Footer";
import ParkingSpotDetailsPage from "./components/Location/ParkingSpotDetailsPage";
import AboutUs from "./components/AboutUs/AboutUs";
function App() {
  return (
    <div className="approot">
      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="go" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirmation" element={<ConfirmEmail />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="/parking-spots" element={<ParkingSpotDetailsPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<Missing />} />
          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={["Client", "Renter"]} />}
            >
              <Route path="home" element={<Home />} />
            </Route>

            <Route
              element={<RequireAuth allowedRoles={["Client", "Renter"]} />}
            >
              <Route path="client" element={<Client />} />
            </Route>
            <Route
              element={<RequireAuth allowedRoles={["Client", "Renter"]} />}
            >
              <Route path="admin" element={<Admin />} />
              <Route
                path="admin/confirm-details"
                element={<ConfirmDetails />}
              />
            </Route>
            <Route element={<RequireAuth allowedRoles={["Renter"]} />}>
              <Route path="renter" element={<Renter />} />
            </Route>
          </Route>
          {/* catch all */}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
