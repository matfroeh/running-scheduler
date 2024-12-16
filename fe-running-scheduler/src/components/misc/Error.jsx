import { useRouteError } from "react-router";

const Error = () => {
    const error = useRouteError();

    return (
        <div className="container mx-auto my-5">
            <h1 className="text-center text-2xl">Error</h1>
            <p className="text-center">Stack trace:</p>
            <div className="mockup-code">
                {error.stack.split("\n").map((line, index) => (
                    <pre
                        key={index}
                        data-prefix={index + 1}
                        className={`${
                            index === 0 && "bg-warning text-warning-content"
                        }`}
                    >
                        <code>{line}</code>
                    </pre>
                ))}
            </div>
        </div>
    );
};

export default Error;
