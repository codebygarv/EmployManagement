import React from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../routes';
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';

const AppBreadcrumb = () => {
    const currentLocation = useLocation().pathname;

    const getRouteName = (pathname, routes) => {
        const currentRoute = routes.find((route) => {
            const routeRegex = new RegExp(`^${route.path.replace(/:\w+/g, '\\w+')}$`);
            return routeRegex.test(pathname);
        });
        return currentRoute ? currentRoute.name : false;
    };

    const getBreadcrumbs = (location) => {
        const breadcrumbs = [];
        location.split('/').reduce((prev, curr, index, array) => {
            const currentPathname = `${prev}/${curr}`;
            const routeName = getRouteName(currentPathname, routes);
            routeName &&
                breadcrumbs.push({
                    pathname: currentPathname,
                    name: routeName,
                    active: index + 1 === array.length,
                });
            return currentPathname;
        });
        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs(currentLocation);

    return (
        <CBreadcrumb className="my-0">
            <CBreadcrumbItem >Dashboard</CBreadcrumbItem>
            {breadcrumbs.map((breadcrumb, index) => (
                <CBreadcrumbItem style={{ textDecoration: 'none' }}
                    {...(breadcrumb.active ? { active: true } : '' )}
                    key={index}
                    
                >
                    <span style={{ textDecoration: 'none' }}>{breadcrumb.name}</span>
                </CBreadcrumbItem>
            ))}
        </CBreadcrumb>
    );
};

export default React.memo(AppBreadcrumb);
