import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import { NavLink } from 'react-router-dom';
import { ROUTES, SIDE_NAV_WIDTH } from '../../constants/app';
import './side-nav.scss';

const NAV_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', to: ROUTES.dashboard, Icon: DashboardIcon },
    { key: 'loads', label: 'Loads', to: ROUTES.loads, Icon: LocalShippingIcon },
    { key: 'carriers', label: 'Carriers', to: ROUTES.carriers, Icon: BusinessIcon },
];

export default function SideNav() {
    return (
        <nav
            id="side-nav"
            className="side-nav"
            data-testid="side-nav"
            aria-label="Main navigation"
            style={{ width: SIDE_NAV_WIDTH }}
        >
            <List>
                {NAV_ITEMS.map(({ key, label, to, Icon }) => (
                    <ListItemButton
                        key={key}
                        id={`side-nav-link-${key}`}
                        data-testid={`side-nav-link-${key}`}
                        component={NavLink}
                        to={to}
                        title={`Go to ${label}`}
                        className="side-nav__link"
                    >
                        <ListItemIcon>
                            <Icon />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItemButton>
                ))}
            </List>
        </nav>
    );
}
