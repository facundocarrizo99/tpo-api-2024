import { useRouteError, Link, useNavigate } from "react-router-dom"

// library imports
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="error">
            <h1>Uh oh! We’ve got a problem.</h1>
            <p>{error.message || error.statusText}</p>
            <div className="flex-md">
                <button
                    className="btn btn--dark"
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon width={20} />
                    <span>Go Back</span>
                </button>
                <Link
                    to="/"
                    className="btn btn--dark"
                >
                    <HomeIcon width={20} />
                    <span>Go home</span>
                </Link>
            </div>
        </div>
    )
}
export default Error