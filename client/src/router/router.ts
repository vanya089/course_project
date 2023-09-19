import Home from "../pages/Home";
import {ADMIN_ROUTE, CREATE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE} from "../utils/consts";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import UserPage from "../pages/UserPage";
import CreateReview from "../components/CreateReview";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },

]

export const userRoutes = [
    {
        path: USER_ROUTE,
        Component: UserPage,
    },
    {
        path: CREATE_ROUTE,
        Component: CreateReview,
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Home,
    },
    {
        path: LOGIN_ROUTE,
        Component: Login,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration,
    },

]
