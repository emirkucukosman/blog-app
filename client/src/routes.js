import React, { Suspense, Fragment, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';
import LoadingScreen from './components/LoadingScreen'
import DashboardLayout from './layouts/DashboardLayout'

export const renderRoutes = (routes = []) => (
    <Suspense fallback={<LoadingScreen />}>
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route 
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>
                                    {route.routes
                                    ? renderRoutes(route.routes)
                                    : <Component {...props} />}
                                </Layout>
                            </Guard>
                        )}
                    />
                )
            })}
        </Switch>
    </Suspense>
)

const routes = [
    {
        exact: true,
        path: '/404',
        component: lazy(() => import('./views/errors/NotFoundView'))
    },
    {
        path: '/blogs',
        guard: AuthGuard,
        layout: DashboardLayout,
        routes: [
            {
                exact: true,
                path: '/blogs/browse',
                component: lazy(() => import('./views/blogs/ListBlogsView'))
            },
            {
                exact: true,
                path: '/blogs/create',
                component: lazy(() => import('./views/blogs/CreateBlogView'))
            },
            {
                component: () => <Redirect to="/404" />
            }
        ]
    },
    {
        path: '*',
        guard: GuestGuard,
        routes: [
            {
                exact: true,
                path: '/',
                component: lazy(() => import('./views/auth/LoginView'))
            },
            {
                component: () => <Redirect to="/404" />
            }
        ]
    }
]

export default routes;