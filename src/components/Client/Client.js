import { Link } from "react-router-dom";
import ClientSearchForm from "./ClientSearchForm";
import CLSearchResults from "./Views/CLSearchResults";
import { FaChevronCircleLeft } from "react-icons/fa";

const Client = () => {
  return (
    <section>
      <div style={{ display: "flex" }}>
        <div>
          <Link to="/admin">
            <FaChevronCircleLeft />
          </Link>
        </div>
        <div>
          <h1>Client Page</h1>
        </div>
      </div>
      <br />
      <p>This is where you can make a booking.</p>
      <ClientSearchForm />
      <CLSearchResults />
    </section>
  );
};

export default Client;
