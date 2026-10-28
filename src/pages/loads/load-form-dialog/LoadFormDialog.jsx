import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CUSTOMERS, LOAD_STATUSES, RATE_PATTERN } from '../../../constants/app';
import { saveLoad } from '../../../mock/mock-api';
import './load-form-dialog.scss';

const EMPTY_FORM = {
    customer: '',
    origin: '',
    destination: '',
    pickupDate: '',
    rate: '',
    status: LOAD_STATUSES[0],
};

const toFormValues = (load) => (load ? { ...load, rate: String(load.rate) } : EMPTY_FORM);

export default function LoadFormDialog({ isOpen, load, onClose, onSaved }) {
    const [isSaving, setIsSaving] = useState(false);
    const {
        control,
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({ defaultValues: EMPTY_FORM });

    useEffect(() => {
        if (isOpen) {
            reset(toFormValues(load));
        }
    }, [isOpen, load, reset]);

    const title = load ? `Edit load ${load.loadNumber}` : 'Create load';

    const onSubmit = (values) => {
        setIsSaving(true);
        saveLoad({ ...values, id: load?.id, rate: Number(values.rate) })
            .then((response) => {
                if (response.data) {
                    toast.success(`Load ${response.data.loadNumber} saved`);
                    onSaved(response.data);
                } else {
                    toast.error('Could not save the load');
                }
            })
            .finally(() => setIsSaving(false));
    };

    return (
        <Dialog open={isOpen} onClose={onClose} aria-labelledby="load-form-title" fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="load-form-dialog tms-form">
                <DialogTitle id="load-form-title">{title}</DialogTitle>
                <DialogContent className="load-form-dialog__fields">
                    <Controller
                        name="customer"
                        control={control}
                        rules={{ required: 'Customer is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="load-form-customer"
                                label="Customer"
                                select
                                error={Boolean(errors.customer)}
                                helperText={errors.customer?.message}
                            >
                                {CUSTOMERS.map((customer) => (
                                    <MenuItem key={customer} value={customer}>
                                        {customer}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <TextField
                        id="load-form-origin"
                        label="Origin"
                        error={Boolean(errors.origin)}
                        helperText={errors.origin?.message}
                        {...register('origin', { required: 'Origin is required' })}
                    />
                    <TextField
                        id="load-form-destination"
                        label="Destination"
                        error={Boolean(errors.destination)}
                        helperText={errors.destination?.message}
                        {...register('destination', {
                            required: 'Destination is required',
                            validate: (value) =>
                                value.trim().toLowerCase() !== getValues('origin').trim().toLowerCase() ||
                                'Destination must be different from origin',
                        })}
                    />
                    <TextField
                        id="load-form-pickup-date"
                        label="Pickup date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={Boolean(errors.pickupDate)}
                        helperText={errors.pickupDate?.message}
                        {...register('pickupDate', { required: 'Pickup date is required' })}
                    />
                    <TextField
                        id="load-form-rate"
                        label="Rate (USD)"
                        inputMode="decimal"
                        error={Boolean(errors.rate)}
                        helperText={errors.rate?.message}
                        {...register('rate', {
                            required: 'Rate is required',
                            pattern: { value: RATE_PATTERN, message: 'Enter a valid amount, for example 1500.00' },
                        })}
                    />
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} id="load-form-status" label="Status" select>
                                {LOAD_STATUSES.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSaving}>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
