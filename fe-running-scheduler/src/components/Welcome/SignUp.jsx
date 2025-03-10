import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router";
import { toast } from "react-toastify";
import { signUp } from "@/data";
import { useAuth } from "@/context";

const SignUp = () => {
    const { setCheckSession, auth } = useAuth();
    const [{ userName, email, password, confirmPassword }, setForm] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!userName || !email || !password || !confirmPassword) {
                throw new Error("All fields are required");
            }
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            setLoading(true);
            await signUp({ userName, email, password });
            setCheckSession(true);
            toast.success("Successfully registered!");
            navigate("/auth");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (auth) return <Navigate to={location.state?.next || "../auth"} />;

    return (
        <div className="modal modal-open bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="modal-window flex-auto max-w-max p-8 bg-base-100 rounded-lg border shadow-lg">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">Sign Up</h2>

                    <Link className="btn btn-square btn-ghost btn-sm" to="../">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </Link>
                </div>
                <form
                    className="mt-8 flex flex-col gap-3"
                    onSubmit={handleSubmit}
                >
                    <label className="grow input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                            name="userName"
                            value={userName}
                            onChange={handleChange}
                            className="grow"
                            placeholder="Username"
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            name="email"
                            value={email}
                            onChange={handleChange}
                            type="email"
                            className="grow"
                            placeholder="Email"
                        />
                    </label>
                    <label className="grow input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            name="password"
                            value={password}
                            onChange={handleChange}
                            type="password"
                            className="grow"
                            placeholder="Password"
                        />
                    </label>
                    <label className="grow input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            type="password"
                            className="grow"
                            placeholder="Confirm your password..."
                        />
                    </label>
                    <small>
                        Already have an account?{" "}
                        <Link
                            to="../login"
                            className="text-primary hover:underline"
                        >
                            Log in!
                        </Link>
                    </small>
                    <button
                        className="btn btn-primary self-center mt-4"
                        disabled={loading}
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
