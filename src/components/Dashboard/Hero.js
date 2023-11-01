// import { Link } from "react-router-dom";
// import Landing from "../Landing/Landing";

const Hero = () => {
  return (
    <section>
      <Landing />
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <br />
      <h2>Private</h2>
      <Link to="/home">Home</Link>
      <Link to="/client">Clients Page</Link>
      <Link to="/admin">Admin Page</Link>
    </section>
  );
};

export default Hero;
