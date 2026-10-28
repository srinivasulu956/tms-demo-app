import { CITIES, CUSTOMERS, LOAD_STATUSES } from '../constants/app';

const FIRST_LOAD_ID = 1001;
const INITIAL_LOAD_COUNT = 42;

export const createInitialLoads = () =>
    Array.from({ length: INITIAL_LOAD_COUNT }, (_, index) => {
        const id = FIRST_LOAD_ID + index;
        const day = String((index % 28) + 1).padStart(2, '0');
        return {
            id,
            loadNumber: `LD-${id}`,
            customer: CUSTOMERS[index % CUSTOMERS.length],
            origin: CITIES[index % CITIES.length],
            destination: CITIES[(index * 3 + 1) % CITIES.length],
            status: LOAD_STATUSES[index % LOAD_STATUSES.length],
            pickupDate: `2026-11-${day}`,
            rate: 1200 + ((index * 137) % 2500),
        };
    });

export const CARRIERS = [
    { mcNumber: 'MC-100231', name: 'Lone Star Freight', city: 'Dallas, TX', phone: '214-555-0101', isActive: true },
    { mcNumber: 'MC-100458', name: 'Great Lakes Haulers', city: 'Chicago, IL', phone: '312-555-0144', isActive: true },
    { mcNumber: 'MC-100702', name: 'Peach State Logistics', city: 'Atlanta, GA', phone: '404-555-0178', isActive: false },
    { mcNumber: 'MC-100915', name: 'Rocky Mountain Carriers', city: 'Denver, CO', phone: '303-555-0122', isActive: true },
    { mcNumber: 'MC-101120', name: 'Desert Line Transport', city: 'Phoenix, AZ', phone: '602-555-0190', isActive: true },
    { mcNumber: 'MC-101377', name: 'Delta Blues Trucking', city: 'Memphis, TN', phone: '901-555-0133', isActive: false },
];
