import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import SideNav from '../side-nav/SideNav';
import './app-layout.scss';

export default function AppLayout() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(true);

    return (
        <div className="app-layout">
            <Header onToggleSideNav={() => setIsSideNavOpen((isOpen) => !isOpen)} />
            <div className="app-layout__body">
                {isSideNavOpen && <SideNav />}
                <main id="main-content" className="app-layout__content" data-testid="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
