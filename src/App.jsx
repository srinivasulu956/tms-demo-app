import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/app';
import ProtectedRoute from './auth/ProtectedRoute';
import AppLayout from './layout/app-layout/AppLayout';
import LoginPage from './pages/login/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import LoadsPage from './pages/loads/LoadsPage';
import CarriersPage from './pages/carriers/CarriersPage';

export default function App() {
    return (
        <Routes>
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path={ROUTES.dashboard} element={<DashboardPage />} />
                    <Route path={ROUTES.loads} element={<LoadsPage />} />
                    <Route path={ROUTES.carriers} element={<CarriersPage />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
        </Routes>
    );
}
