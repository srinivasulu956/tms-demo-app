export const APP_NAME = 'TMS Demo';

export const ROUTES = {
    login: '/login',
    dashboard: '/dashboard',
    loads: '/loads',
    carriers: '/carriers',
};

export const DEMO_USER = {
    username: 'qa.demo',
    password: 'Demo@123',
    displayName: 'QA Demo User',
};

export const AUTH_STORAGE_KEY = 'tms-demo-user';

export const MOCK_API_DELAY_MS = 600;

export const LOADS_PAGE_SIZE = 10;

export const ALL_STATUSES = 'All';

export const LOAD_STATUSES = ['Booked', 'In Transit', 'Delivered', 'Cancelled'];

export const CUSTOMERS = ['Acme Foods', 'Blue River Steel', 'Northwind Retail', 'Summit Paper'];

export const CITIES = [
    'Chicago, IL',
    'Dallas, TX',
    'Atlanta, GA',
    'Denver, CO',
    'Phoenix, AZ',
    'Memphis, TN',
    'Columbus, OH',
    'Laredo, TX',
];

export const RATE_PATTERN = /^\d+(\.\d{1,2})?$/;

export const SIDE_NAV_WIDTH = 220;
