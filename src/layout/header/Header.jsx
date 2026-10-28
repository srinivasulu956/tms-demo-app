import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { APP_LOGO_ALT, APP_LOGO_SRC, APP_NAME, ROUTES } from '../../constants/app';
import { useAuth } from '../../auth/useAuth';
import './header.scss';

export default function Header({ onToggleSideNav }) {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate(ROUTES.login, { replace: true });
    };

    return (
        <AppBar position="static" component="header" id="app-header" className="app-header" data-testid="app-header">
            <Toolbar>
                <IconButton
                    id="header-toggle-nav"
                    className="app-header__toggle-nav"
                    data-testid="header-toggle-nav"
                    color="inherit"
                    edge="start"
                    aria-label="Toggle navigation"
                    title="Toggle navigation"
                    onClick={onToggleSideNav}
                >
                    <MenuIcon />
                </IconButton>
                <img className="app-header__logo" src={APP_LOGO_SRC} alt={APP_LOGO_ALT} data-testid="header-logo" />
                <Typography
                    id="header-app-name"
                    className="app-header__app-name"
                    data-testid="header-app-name"
                    variant="h6"
                    component="span"
                >
                    {APP_NAME}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography
                    id="header-user-name"
                    className="app-header__user-name"
                    data-testid="header-user-name"
                    component="span"
                    title="Signed-in user"
                    sx={{ mr: 2 }}
                >
                    {user?.displayName}
                </Typography>
                <Button
                    id="header-sign-out"
                    className="app-header__sign-out"
                    data-testid="header-sign-out"
                    color="inherit"
                    variant="outlined"
                    title="Sign out of the app"
                    onClick={handleSignOut}
                >
                    Sign out
                </Button>
            </Toolbar>
        </AppBar>
    );
}
