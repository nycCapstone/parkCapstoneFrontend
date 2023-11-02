import { useGetPropertiesQuery } from "../../redux/renter/renterApiSlice";
import { Link } from "react-router-dom";
import PropertyForm from "../Forms/PropertyForm";

const Renter = () => {

    const { data: renterData, isLoading, isSuccess, error } = useGetPropertiesQuery();

    if (isLoading) {
        return <div>
            <p>...Loading</p>
            <p>...Loading</p>
            <p>...Loading</p>
            <p>...Loading</p>
        </div>
    }

    if (isSuccess) {

        return (
            <section>
                <h1>Renter Page</h1>
                <br />
                <p>This is where you can make new available spots.</p>
                <PropertyForm/>
                {JSON.stringify(renterData)}
                <div className="flexGrow">
                    <Link to="/home">Home</Link>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <div>Api Error</div>
        )
    }

}

export default Renter