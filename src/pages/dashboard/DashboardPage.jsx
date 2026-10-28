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
        <section id="dashboard-page" className="dashboard-page" data-testid="dashboard-page" aria-labelledby="dashboard-title">
            <Typography
                id="dashboard-title"
                variant="h5"
                component="h1"
                className="page-title"
                data-testid="dashboard-title"
            >
                Dashboard
            </Typography>
            {isLoading ? (
                <CircularProgress aria-label="Loading dashboard" data-testid="dashboard-loader" />
            ) : (
                <Grid container spacing={2}>
                    {LOAD_STATUSES.map((status) => (
                        <Grid item xs={12} sm={6} md={3} key={status}>
                            <Paper
                                id={toTestId(status)}
                                className="dashboard-page__card"
                                sx={{ p: 2 }}
                                data-testid={toTestId(status)}
                                title={`${status} loads`}
                            >
                                <Typography className="dashboard-page__card-label" color="text.secondary">
                                    {status}
                                </Typography>
                                <Typography
                                    className="dashboard-page__card-count"
                                    data-testid={`${toTestId(status)}-count`}
                                    variant="h4"
                                    component="p"
                                >
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
