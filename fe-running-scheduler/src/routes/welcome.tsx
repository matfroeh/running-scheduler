import { Welcome as WelcomePage, ErrorPage } from "@/components/pages";
import { Outlet } from "react-router";

export default function Welcome() {
    return (
        <>
            <WelcomePage />
            <Outlet />
        </>
    );
}

export function ErrorBoundary() {
    return <ErrorPage />;
}
