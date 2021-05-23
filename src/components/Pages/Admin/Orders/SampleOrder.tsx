import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { Fragment, memo } from 'react';

const useStyle = makeStyles(theme => ({
  img: {
    maxWidth: '100%',
    margin: 'auto',
    display: 'block',
    padding: 5,
    boxShadow: theme.shadows['5']
  },
  cardActions: {
    justifyContent: 'flex-end'
  }
}));

const SampleOrder = memo((props: {}) => {
  const classes = useStyle(props);
  return (
    <Fragment>
      <Card>
        <CardActions className={classes.cardActions}></CardActions>
      </Card>
    </Fragment>
  );
});
export default SampleOrder;
