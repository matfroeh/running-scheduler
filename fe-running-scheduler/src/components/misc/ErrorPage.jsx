import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen">
            <div className="max-w-md p-8 shadow-lg rounded-lg text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
                <p className="mb-6">
                    Something went wrong. Please try again later or return to
                    the homepage.
                </p>
                <Link
                    reloadDocument={true}
                    to="/"
                    className="px-6 py-2 btn btn-primary"
                >
                    Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
