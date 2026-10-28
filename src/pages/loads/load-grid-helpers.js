import { cloneElement, createContext } from 'react';

export const LoadGridActionsContext = createContext({ onEdit: () => {} });

export const renderLoadRow = (row, props) =>
    cloneElement(row, { ...row.props, 'data-testid': `load-row-${props.dataItem.id}` }, row.props.children);
