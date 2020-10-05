import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import {
  Box,
  Dialog,
  Divider,
  Grid,
  Typography,
  TextField,
  makeStyles,
  IconButton,
  SvgIcon,
  Card,
} from '@material-ui/core';
import PricingForm from '../PricingForm/BasicForm'

import {
  XCircle as CloseIcon,
  ArrowRight as ArrowRightIcon,
} from 'react-feather';

import ActionButton from './ActionButton';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  media: {
    height: 200,
    backgroundColor: theme.palette.background.dark,
  },
  priceDetails : {
    marginBottom: 10
  },

  listName: {
    fontWeight: theme.typography.fontWeightMedium
  },
  checklist: {
    '& + &': {
      marginTop: theme.spacing(3)
    }
  }
}));

function PricingModal({ className, onClose, open, order, ...rest }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [statusActive, setStatus] = useState(true);
  const [modul, setModul] = useState(order.subTitle);
  
 console.log(order)

  return (    
    <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth {...rest}>
      <div className={classes.root}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3" color="textSecondary">
            {order.subTitle}
          </Typography>
          <IconButton onClick={onClose}>
            <SvgIcon>
              <CloseIcon />
            </SvgIcon>
          </IconButton>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={8}>
            <Card className={clsx(classes.root, className)} {...rest}>
              <Divider />
              <PerfectScrollbar>
              <Box>
                <PricingForm pakke={order.subTitle}/>
              </Box>
              </PerfectScrollbar>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="overline" color="textSecondary">
              Info om pakke:
            </Typography>
            <ActionButton
              icon={ArrowRightIcon}
              onClick={() => setModul('Warm Food')}
              disabled={modul === '1 lokasjon / 1 QR kode' ? false : true}
            >
              {/* Status: {getStatusLabel('new')} */}
              1 LOKASJON
            </ActionButton>
            <ActionButton
              icon={ArrowRightIcon}
              onClick={() => setModul('Cold Food')}
              disabled={modul !== '3 lokasjoner / 3 QR koder' ? true : false}
            >
              {/* Status: {getStatusLabel('inProcess')} */}
              3 LOKASJONER
            </ActionButton>
            <ActionButton
              icon={ArrowRightIcon}
              onClick={() => setModul('Snacks')}
              disabled={modul !== '4-10 lokasjoner / 3-10 QR koder' ? true : false}
            >
              {/* Status: {getStatusLabel('toDelivery')} */}
              4-10 LOKASJONER
            </ActionButton>
            
            <Box mt={3}>
              <Typography variant="overline" color="textSecondary">
                {/* {menuItem.name} Pricing Details */}
              </Typography>
              <TextField
                // className={classes.priceDetails}
                id='price'
                defaultValue={`Pris : ${order.price}`}
                // variant='filled'
                label={order.subTitle}
                disabled
                fullWidth = {true}
              >
              </TextField>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
}

PricingModal.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

PricingModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default PricingModal;
