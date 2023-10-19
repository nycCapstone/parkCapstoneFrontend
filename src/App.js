import Nav from "./components/Nav/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Client from "./components/Client";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Renter from "./components/Renter";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import ConfirmEmail from "./components/ConfirmEmail";
import { Container } from "react-bootstrap";

const SITEROLES = {
  Client: {1: { bckgr: false, pmt: false }},
  Renter: {2: { bckgr: false, pmt: false }}
};

function App() {
  return (
    <Container className="approot">
      <Nav/>


    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="confirmation" element={<ConfirmEmail />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Missing />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[SITEROLES.Client, SITEROLES.Renter]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[SITEROLES.Client]} />}>
            <Route path="client" element={<Client />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[SITEROLES.Client, SITEROLES.Renter]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[SITEROLES.Client, SITEROLES.Renter]} />}
          >
            <Route path="renter" element={<Renter />} />
          </Route>
        </Route>

        {/* catch all */}
      </Route>
    </Routes>
    </Container>
  );
}

export default App;
