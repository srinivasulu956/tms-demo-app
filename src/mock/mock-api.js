import { DEMO_USER, MOCK_API_DELAY_MS } from '../constants/app';
import { CARRIERS, createInitialLoads } from './mock-data';

let loads = createInitialLoads();

const wait = () => new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY_MS));

export const loginUser = async ({ username, password }) => {
    await wait();
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
        return { data: { username: DEMO_USER.username, displayName: DEMO_USER.displayName } };
    }
    return { error: 'Invalid username or password' };
};

export const fetchLoads = async () => {
    await wait();
    return { data: [...loads] };
};

export const saveLoad = async (load) => {
    await wait();
    if (load.id) {
        loads = loads.map((existing) => (existing.id === load.id ? { ...existing, ...load } : existing));
        return { data: loads.find((existing) => existing.id === load.id) };
    }
    const id = Math.max(...loads.map((existing) => existing.id)) + 1;
    const created = { ...load, id, loadNumber: `LD-${id}` };
    loads = [...loads, created];
    return { data: created };
};

export const fetchCarriers = async () => {
    await wait();
    return { data: [...CARRIERS] };
};
