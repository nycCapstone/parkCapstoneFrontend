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
import LinkPage from "./components/Dashboard/LinkPage";
import RequireAuth from "./components/State/RequireAuth";
import PersistLogin from "./components/State/PersistLogin";
import { Routes, Route } from "react-router-dom";
import ConfirmEmail from "./components/Confirm/ConfirmEmail";
import ConfirmDetails from "./components/Confirm/ConfirmDetails";

function App() {
  return (
    <div className="approot">
      <Nav/>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<LinkPage />} />
        <Route path="go" element={<LinkPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="confirmation" element={<ConfirmEmail />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Missing />} />
        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["Client", "Renter"]} />}>
            <Route path="home" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["Client", "Renter"]} />}>
            <Route path="client" element={<Client />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["Client", "Renter"]} />}>
            <Route path="admin" element={<Admin />} />
            <Route path="admin/confirm-details" element={<ConfirmDetails />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["Renter"]} />}
          >
            <Route path="renter" element={<Renter />} />
          </Route>
        </Route>
        {/* catch all */}
      </Route>
    </Routes>
    </div>
  );
}

export default App;
