import { Link } from "react-router-dom"

const Client = () => {
    return (
        <section>
            <h1>Client Page</h1>
            <br />
            <p>This is where you can make a booking.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Client
