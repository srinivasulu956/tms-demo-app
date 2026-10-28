import { useEffect, useState } from 'react';
import {
    Chip,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { fetchCarriers } from '../../mock/mock-api';

export default function CarriersPage() {
    const [carriers, setCarriers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCarriers()
            .then((response) => {
                if (response.data) {
                    setCarriers(response.data);
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <section aria-labelledby="carriers-title">
            <Typography id="carriers-title" variant="h5" component="h1" className="page-title">
                Carriers
            </Typography>
            {isLoading ? (
                <CircularProgress aria-label="Loading carriers" />
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="Carriers" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>MC #</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {carriers.map((carrier) => (
                                <TableRow key={carrier.mcNumber} data-testid={`carrier-row-${carrier.mcNumber}`}>
                                    <TableCell>{carrier.mcNumber}</TableCell>
                                    <TableCell>{carrier.name}</TableCell>
                                    <TableCell>{carrier.city}</TableCell>
                                    <TableCell>{carrier.phone}</TableCell>
                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={carrier.isActive ? 'Active' : 'Inactive'}
                                            color={carrier.isActive ? 'success' : 'default'}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </section>
    );
}
