import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { APP_NAME, ROUTES } from '../../constants/app';
import { useAuth } from '../../auth/useAuth';

export default function Header({ onToggleSideNav }) {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate(ROUTES.login, { replace: true });
    };

    return (
        <AppBar position="static" component="header">
            <Toolbar>
                <IconButton color="inherit" edge="start" aria-label="Toggle navigation" onClick={onToggleSideNav}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="span" sx={{ ml: 1 }}>
                    {APP_NAME}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography component="span" sx={{ mr: 2 }} data-testid="header-user-name">
                    {user?.displayName}
                </Typography>
                <Button color="inherit" variant="outlined" onClick={handleSignOut}>
                    Sign out
                </Button>
            </Toolbar>
        </AppBar>
    );
}
