import { useContext } from 'react';
import { Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { LoadGridActionsContext } from './load-grid-helpers';

const STATUS_COLORS = {
    Booked: 'info',
    'In Transit': 'warning',
    Delivered: 'success',
    Cancelled: 'default',
};

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const cellProps = (props) => ({
    className: props.className,
    style: props.style,
    role: 'gridcell',
    'aria-colindex': props.ariaColumnIndex,
});

export function StatusCell(props) {
    const { status } = props.dataItem;
    return (
        <td {...cellProps(props)}>
            <Chip size="small" label={status} color={STATUS_COLORS[status]} />
        </td>
    );
}

export function RateCell(props) {
    return <td {...cellProps(props)}>{currencyFormatter.format(props.dataItem.rate)}</td>;
}

export function ActionsCell(props) {
    const { onEdit } = useContext(LoadGridActionsContext);
    const load = props.dataItem;
    return (
        <td {...cellProps(props)}>
            <IconButton
                id={`load-edit-${load.id}`}
                className="loads-page__edit"
                data-testid={`load-edit-${load.id}`}
                size="small"
                aria-label={`Edit load ${load.loadNumber}`}
                title={`Edit load ${load.loadNumber}`}
                onClick={() => onEdit(load)}
            >
                <EditIcon fontSize="small" />
            </IconButton>
        </td>
    );
}
