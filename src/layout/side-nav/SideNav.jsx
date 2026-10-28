import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import { NavLink } from 'react-router-dom';
import { ROUTES, SIDE_NAV_WIDTH } from '../../constants/app';
import './side-nav.scss';

const NAV_ITEMS = [
    { label: 'Dashboard', to: ROUTES.dashboard, Icon: DashboardIcon },
    { label: 'Loads', to: ROUTES.loads, Icon: LocalShippingIcon },
    { label: 'Carriers', to: ROUTES.carriers, Icon: BusinessIcon },
];

export default function SideNav() {
    return (
        <nav className="side-nav" aria-label="Main navigation" style={{ width: SIDE_NAV_WIDTH }}>
            <List>
                {NAV_ITEMS.map(({ label, to, Icon }) => (
                    <ListItemButton key={to} component={NavLink} to={to} className="side-nav__link">
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
