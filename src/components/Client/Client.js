import { Link } from "react-router-dom";
import ClientSearchForm from "./ClientSearchForm";
import CLSearchResults from "./Views/CLSearchResults";

const Client = () => {

    return (
        <section>
            <h1>Client Page</h1>
            <br />
            <p>This is where you can make a booking.</p>
            <ClientSearchForm />
            <CLSearchResults />
            <div className="flexGrow">
                <Link to="/home">Home</Link>
            </div>
        </section>
    )
}

export default Client
