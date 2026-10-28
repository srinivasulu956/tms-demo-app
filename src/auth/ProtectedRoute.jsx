import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/app';
import { useAuth } from './useAuth';

export default function ProtectedRoute() {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />;
    }
    return <Outlet />;
}
