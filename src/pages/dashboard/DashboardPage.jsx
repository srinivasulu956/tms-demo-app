import { useEffect, useState } from 'react';
import { CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { LOAD_STATUSES } from '../../constants/app';
import { fetchLoads } from '../../mock/mock-api';

const toTestId = (status) => `dashboard-card-${status.toLowerCase().replace(/\s+/g, '-')}`;

export default function DashboardPage() {
    const [loads, setLoads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLoads()
            .then((response) => {
                if (response.data) {
                    setLoads(response.data);
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <section aria-labelledby="dashboard-title">
            <Typography id="dashboard-title" variant="h5" component="h1" className="page-title">
                Dashboard
            </Typography>
            {isLoading ? (
                <CircularProgress aria-label="Loading dashboard" />
            ) : (
                <Grid container spacing={2}>
                    {LOAD_STATUSES.map((status) => (
                        <Grid item xs={12} sm={6} md={3} key={status}>
                            <Paper sx={{ p: 2 }} data-testid={toTestId(status)}>
                                <Typography color="text.secondary">{status}</Typography>
                                <Typography variant="h4" component="p">
                                    {loads.filter((load) => load.status === status).length}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </section>
    );
}
