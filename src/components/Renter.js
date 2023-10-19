import { Link } from "react-router-dom"

const Renter = () => {
    return (
        <section>
            <h1>The Renter</h1>
            <br />
            <p>Clients and Renters can hang out here.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Renter
