import { useState } from 'react';
import { Alert, Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { APP_LOGO_ALT, APP_LOGO_SRC, APP_NAME, ROUTES } from '../../constants/app';
import { useAuth } from '../../auth/useAuth';
import { loginUser } from '../../mock/mock-api';
import './login-page.scss';

export default function LoginPage() {
    const { user, signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [loginError, setLoginError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: { username: '', password: '' } });

    if (user) {
        return <Navigate to={ROUTES.dashboard} replace />;
    }

    const onSubmit = (values) => {
        setIsSigningIn(true);
        setLoginError('');
        loginUser(values)
            .then((response) => {
                if (response.data) {
                    signIn(response.data);
                    navigate(location.state?.from || ROUTES.dashboard, { replace: true });
                } else {
                    setLoginError(response.error);
                }
            })
            .finally(() => setIsSigningIn(false));
    };

    return (
        <main id="login-page" className="login-page" data-testid="login-page">
            <Paper
                component="form"
                id="login-form"
                className="login-page__card tms-form"
                data-testid="login-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-labelledby="login-title"
            >
                <img className="login-page__logo" src={APP_LOGO_SRC} alt={APP_LOGO_ALT} data-testid="login-logo" />
                <Typography
                    id="login-title"
                    className="login-page__title"
                    data-testid="login-title"
                    variant="h5"
                    component="h1"
                    gutterBottom
                >
                    Sign in to {APP_NAME}
                </Typography>
                {loginError && (
                    <Alert id="login-error" className="login-page__error" data-testid="login-error" severity="error">
                        {loginError}
                    </Alert>
                )}
                <TextField
                    id="login-username"
                    className="login-page__username"
                    label="Username"
                    placeholder="Enter your username"
                    autoComplete="username"
                    fullWidth
                    margin="normal"
                    inputProps={{ 'data-testid': 'login-username' }}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                    {...register('username', { required: 'Username is required' })}
                />
                <TextField
                    id="login-password"
                    className="login-page__password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    margin="normal"
                    inputProps={{ 'data-testid': 'login-password' }}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Password is required' })}
                />
                <Button
                    id="login-submit"
                    className="login-page__submit"
                    data-testid="login-submit"
                    type="submit"
                    variant="contained"
                    title="Sign in with your username and password"
                    fullWidth
                    disabled={isSigningIn}
                    sx={{ mt: 2 }}
                >
                    Sign in
                </Button>
            </Paper>
        </main>
    );
}
