import ClientSearchForm from "./Views/ClientSearchForm";
import { Link } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import "./Styles/Client.css";

const ClientSearchPage = () => {
  return (
    <div className="cl-search-container">
      <header>
        <div className="cl-h-svgleft">
          <Link to="/client">
            <FaChevronCircleLeft />
          </Link>
        </div>

        <h1>Enter Place and Time you are interested in</h1>
      </header>
      <ClientSearchForm />
    </div>
  );
};

export default ClientSearchPage;

