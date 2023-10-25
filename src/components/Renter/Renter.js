import { Link } from "react-router-dom";

const Renter = () => {

    return (
        <section>
            <h1>Renter Page</h1>
            <br />
            <p>This is where you can make new available spots.</p>
            <div className="flexGrow">
                <Link to="/home">Home</Link>
            </div>
        </section>
    )
}

export default Renter