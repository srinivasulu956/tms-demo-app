import { useState } from 'react';
import { Alert, Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME, ROUTES } from '../../constants/app';
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
        <main className="login-page">
            <Paper
                component="form"
                className="login-page__card tms-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-labelledby="login-title"
            >
                <Typography id="login-title" variant="h5" component="h1" gutterBottom>
                    Sign in to {APP_NAME}
                </Typography>
                {loginError && <Alert severity="error">{loginError}</Alert>}
                <TextField
                    id="login-username"
                    label="Username"
                    autoComplete="username"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                    {...register('username', { required: 'Username is required' })}
                />
                <TextField
                    id="login-password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Password is required' })}
                />
                <Button type="submit" variant="contained" fullWidth disabled={isSigningIn} sx={{ mt: 2 }}>
                    Sign in
                </Button>
            </Paper>
        </main>
    );
}
