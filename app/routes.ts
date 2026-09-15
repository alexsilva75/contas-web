import { 
    type RouteConfig, 
    index, 
    route,
    layout,
 } from "@react-router/dev/routes";

export default [
        index("routes/home.tsx"),
        
        layout('routes/protected.tsx',[
            route('dashboard', 'routes/dashboard.tsx'),
        ])
    ] satisfies RouteConfig;
