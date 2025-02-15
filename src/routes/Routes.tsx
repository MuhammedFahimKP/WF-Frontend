import { createBrowserRouter } from "react-router-dom";
import UserRoutes from "./UserRoutes.tsx";
import AdminRoutes from "./NewAdminRoutes.ts";

const routePatterns = [...UserRoutes.routes, ...AdminRoutes.routes];

const routes = createBrowserRouter(routePatterns);

export default routes;
export const { navigate } = routes;
