import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Toolbar from 'components/Layout/Toolbar';
import CardLoader from 'components/Shared/CardLoader';
import SearchField from 'components/Shared/Pagination/SearchField';
import usePaginationObservable from 'hooks/usePagination';
import IUser from 'interfaces/models/user';
import React, { Fragment, memo, useCallback, useState } from 'react';
import userService from 'services/user';
import FormDialog from '../FormDialog';

const OrderListPage = memo(() => {
  const [formOpened, setFormOpened] = useState(false);
  const [current, setCurrent] = useState<IUser>();

  const [params, mergeParams, loading, , refresh] = usePaginationObservable(
    params => userService.list(params),
    { orderBy: 'fullName', orderDirection: 'asc' },
    []
  );

  const formCallback = useCallback(
    (user?: IUser) => {
      setFormOpened(false);
      current ? refresh() : mergeParams({ term: user.email });
    },
    [current, mergeParams, refresh]
  );

  const formCancel = useCallback(() => setFormOpened(false), []);
  const handleCreate = useCallback(() => {
    setCurrent(null);
    setFormOpened(true);
  }, []);

  return (
    <Fragment>
      <Toolbar title='Usuários' />
      <Card>
        <CardLoader show={loading} />
        <FormDialog opened={formOpened} user={current} onComplete={formCallback} onCancel={formCancel} />
        <CardContent>
          <Grid container justify='space-between' alignItems='center' spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <SearchField paginationParams={params} onChange={mergeParams} />
            </Grid>

            <Grid item xs={12} sm={'auto'}>
              <Button fullWidth variant='contained' color='primary' onClick={handleCreate}>
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        {/* table goes here     */}
      </Card>
    </Fragment>
  );
});

export default OrderListPage;
