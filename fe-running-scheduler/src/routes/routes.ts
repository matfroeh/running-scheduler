import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route("/", "./welcome.tsx", [
        route("login", "./login.tsx"),
        route("signup", "./signup.tsx"),
    ]),
] satisfies RouteConfig;
