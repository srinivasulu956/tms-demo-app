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
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="load-form-title"
            PaperProps={{ id: 'load-form-dialog', 'data-testid': 'load-form-dialog' }}
            fullWidth
            maxWidth="sm"
        >
            <form
                id="load-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="load-form-dialog tms-form"
                data-testid="load-form"
            >
                <DialogTitle id="load-form-title" className="load-form-dialog__title" data-testid="load-form-title">
                    {title}
                </DialogTitle>
                <DialogContent className="load-form-dialog__fields">
                    <Controller
                        name="customer"
                        control={control}
                        rules={{ required: 'Customer is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="load-form-customer"
                                className="load-form-dialog__customer"
                                label="Customer"
                                select
                                SelectProps={{
                                    SelectDisplayProps: { 'data-testid': 'load-form-customer', title: 'Choose a customer' },
                                }}
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
                        className="load-form-dialog__origin"
                        label="Origin"
                        placeholder="City, ST"
                        inputProps={{ 'data-testid': 'load-form-origin' }}
                        error={Boolean(errors.origin)}
                        helperText={errors.origin?.message}
                        {...register('origin', { required: 'Origin is required' })}
                    />
                    <TextField
                        id="load-form-destination"
                        className="load-form-dialog__destination"
                        label="Destination"
                        placeholder="City, ST"
                        inputProps={{ 'data-testid': 'load-form-destination' }}
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
                        className="load-form-dialog__pickup-date"
                        label="Pickup date"
                        type="date"
                        inputProps={{ 'data-testid': 'load-form-pickup-date' }}
                        InputLabelProps={{ shrink: true }}
                        error={Boolean(errors.pickupDate)}
                        helperText={errors.pickupDate?.message}
                        {...register('pickupDate', { required: 'Pickup date is required' })}
                    />
                    <TextField
                        id="load-form-rate"
                        className="load-form-dialog__rate"
                        label="Rate (USD)"
                        placeholder="e.g. 1500.00"
                        inputProps={{ 'data-testid': 'load-form-rate', inputMode: 'decimal' }}
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
                            <TextField
                                {...field}
                                id="load-form-status"
                                className="load-form-dialog__status"
                                label="Status"
                                select
                                SelectProps={{
                                    SelectDisplayProps: { 'data-testid': 'load-form-status', title: 'Choose a status' },
                                }}
                            >
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
                    <Button
                        id="load-form-cancel"
                        className="load-form-dialog__cancel"
                        data-testid="load-form-cancel"
                        title="Close without saving"
                        onClick={onClose}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        id="load-form-save"
                        className="load-form-dialog__save"
                        data-testid="load-form-save"
                        type="submit"
                        variant="contained"
                        title="Save this load"
                        disabled={isSaving}
                    >
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
