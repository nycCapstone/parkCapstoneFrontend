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

        <h3 className="cl-search-header">
          Enter Place and Time you are interested in
        </h3>
      </header>
      <ClientSearchForm />
    </div>
  );
};

export default ClientSearchPage;
