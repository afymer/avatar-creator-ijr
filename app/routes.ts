import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
    index('routes/welcome/welcome.tsx'),
    route('body', 'routes/body/bodies.tsx'),
] satisfies RouteConfig
