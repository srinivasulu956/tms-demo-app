import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, CircularProgress, MenuItem, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';
import { toast } from 'react-toastify';
import { ALL_STATUSES, LOAD_STATUSES, LOADS_PAGE_SIZE } from '../../constants/app';
import { fetchLoads } from '../../mock/mock-api';
import { ActionsCell, RateCell, StatusCell } from './load-grid-cells';
import { LoadGridActionsContext, renderLoadRow } from './load-grid-helpers';
import LoadFormDialog from './load-form-dialog/LoadFormDialog';
import './loads-page.scss';

const INITIAL_SORT = [{ field: 'loadNumber', dir: 'asc' }];
const INITIAL_PAGE = { skip: 0, take: LOADS_PAGE_SIZE };
const CLOSED_DIALOG = { isOpen: false, load: null };

const matchesSearch = (load, searchText) => {
    const text = searchText.trim().toLowerCase();
    if (!text) {
        return true;
    }
    return [load.loadNumber, load.customer, load.origin, load.destination].some((value) =>
        value.toLowerCase().includes(text),
    );
};

export default function LoadsPage() {
    const [loads, setLoads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState(ALL_STATUSES);
    const [sort, setSort] = useState(INITIAL_SORT);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [dialog, setDialog] = useState(CLOSED_DIALOG);

    const loadLoads = useCallback(() => {
        setIsLoading(true);
        fetchLoads()
            .then((response) => {
                if (response.data) {
                    setLoads(response.data);
                } else {
                    toast.error('Could not load loads');
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        loadLoads();
    }, [loadLoads]);

    const filteredLoads = useMemo(() => {
        const matching = loads.filter(
            (load) =>
                matchesSearch(load, searchText) && (statusFilter === ALL_STATUSES || load.status === statusFilter),
        );
        return orderBy(matching, sort);
    }, [loads, searchText, statusFilter, sort]);

    const visibleLoads = filteredLoads.slice(page.skip, page.skip + page.take);

    const gridActions = useMemo(() => ({ onEdit: (load) => setDialog({ isOpen: true, load }) }), []);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setPage((previous) => ({ ...previous, skip: 0 }));
    };

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
        setPage((previous) => ({ ...previous, skip: 0 }));
    };

    const handleSaved = () => {
        setDialog(CLOSED_DIALOG);
        loadLoads();
    };

    return (
        <section id="loads-page" className="loads-page" data-testid="loads-page" aria-labelledby="loads-title">
            <Typography id="loads-title" variant="h5" component="h1" className="page-title" data-testid="loads-title">
                Loads
            </Typography>
            <div id="loads-toolbar" className="loads-page__toolbar tms-form" data-testid="loads-toolbar">
                <TextField
                    id="loads-search"
                    className="loads-page__search"
                    label="Search loads"
                    placeholder="Load #, customer or city"
                    size="small"
                    inputProps={{ 'data-testid': 'loads-search' }}
                    value={searchText}
                    onChange={handleSearchChange}
                />
                <TextField
                    id="loads-status-filter"
                    label="Status"
                    size="small"
                    select
                    SelectProps={{ SelectDisplayProps: { 'data-testid': 'loads-status-filter', title: 'Filter by status' } }}
                    value={statusFilter}
                    onChange={handleStatusChange}
                    className="loads-page__status-filter"
                >
                    {[ALL_STATUSES, ...LOAD_STATUSES].map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </TextField>
                <div className="loads-page__toolbar-spacer" />
                <Button
                    id="loads-refresh"
                    className="loads-page__refresh"
                    data-testid="loads-refresh"
                    variant="outlined"
                    title="Reload the loads list"
                    startIcon={<RefreshIcon />}
                    onClick={loadLoads}
                    disabled={isLoading}
                >
                    Refresh
                </Button>
                <Button
                    id="loads-create"
                    className="loads-page__create"
                    data-testid="loads-create"
                    variant="contained"
                    title="Create a new load"
                    startIcon={<AddIcon />}
                    onClick={() => setDialog({ isOpen: true, load: null })}
                >
                    Create load
                </Button>
            </div>
            <div id="load-list-grid" className="loads-page__grid" data-testid="load-list-grid" aria-busy={isLoading}>
                {isLoading && (
                    <div className="loads-page__grid-overlay">
                        <CircularProgress aria-label="Loading loads" data-testid="loads-loader" />
                    </div>
                )}
                <LoadGridActionsContext.Provider value={gridActions}>
                    <Grid
                        data={visibleLoads}
                        dataItemKey="id"
                        total={filteredLoads.length}
                        skip={page.skip}
                        take={page.take}
                        pageable={{ buttonCount: 5, info: true }}
                        onPageChange={(event) => setPage({ skip: event.page.skip, take: event.page.take })}
                        sortable
                        sort={sort}
                        onSortChange={(event) => setSort(event.sort)}
                        rowRender={renderLoadRow}
                    >
                        <GridColumn field="loadNumber" title="Load #" width="120px" />
                        <GridColumn field="customer" title="Customer" />
                        <GridColumn field="origin" title="Origin" />
                        <GridColumn field="destination" title="Destination" />
                        <GridColumn field="pickupDate" title="Pickup" width="130px" />
                        <GridColumn field="rate" title="Rate" width="130px" cell={RateCell} />
                        <GridColumn field="status" title="Status" width="140px" cell={StatusCell} />
                        <GridColumn title="Actions" width="100px" sortable={false} cell={ActionsCell} />
                    </Grid>
                </LoadGridActionsContext.Provider>
            </div>
            <LoadFormDialog
                isOpen={dialog.isOpen}
                load={dialog.load}
                onClose={() => setDialog(CLOSED_DIALOG)}
                onSaved={handleSaved}
            />
        </section>
    );
}
