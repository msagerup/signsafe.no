import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
  CardHeader,
  CardMedia
} from '@material-ui/core';
import PricingForm from '../PricingForm/BasicForm'

import {
  XCircle as CloseIcon,
  ArrowRight as ArrowRightIcon,
  Copy as CopyIcon,
  Layout as LayoutIcon
} from 'react-feather';

import ActionButton from './ActionButton';

import { pink } from '@material-ui/core/colors';

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
  // const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [statusActive, setStatus] = useState(true);
  const [menuItemCat, setMenuItemCat] = useState('');
  
  console.log('ORDER', order)

  //Change order status
  const handleChangeStatus = (orderRef, status) => {
    let newStatus;
    axios
      .post(
        `https://europe-west1-hotel-roomservice.cloudfunctions.net/api/updateorder/dd/${orderRef}`,
        {
          status: status
        }
      )
      .then(response => {
        // console.log(response.data.updateStatus.status);
        newStatus = response.data.updateStatus.status;
        // setLoading(false);
        // handleSubmitSuccess();
        setStatus(!statusActive);
      });

    // console.log(statusActive);
  };
  

  return (
    
    <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth {...rest}>
      <div className={classes.root}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3" color="textSecondary">
            {order.subTitle}
          </Typography>
          <IconButton onClick={onClose}>-
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
                <PricingForm />
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
              onClick={() => setMenuItemCat('Warm Food')}
              // disabled={menuItem.type !== 'Warm Food' ? false : true}
            >
              {/* Status: {getStatusLabel('new')} */}
              1 LOKASJON
            </ActionButton>
            <ActionButton
              icon={ArrowRightIcon}
              onClick={() => setMenuItemCat('Cold Food')}
              // disabled={menuItem.type !== 'Cold Food' ? false : true}
            >
              {/* Status: {getStatusLabel('inProcess')} */}
              3 LOKASJONER
            </ActionButton>
            <ActionButton
              icon={ArrowRightIcon}
              onClick={() => setMenuItemCat('Snacks')}
              // disabled={menuItem.type !== 'Snacks' ? false : true}
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
  menuItem: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

PricingModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default PricingModal;
