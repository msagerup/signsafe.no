import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Grid,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import PricingCard from '../../pricing/PricingCard';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 128,
    paddingBottom: 128
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular
  },
  product: {
    position: 'relative',
    padding: theme.spacing(5, 3),
    cursor: 'pointer',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '&:hover': {
      transform: 'scale(1.1)'
    }
  }
}));

const Testimonials = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {/* <Container maxWidth="md"> */}
      {/* <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          className={classes.title}
        >
          &quot;Devias builds some of the best templates you can find for React.
          <br />
          They will save you time.&quot;
        </Typography>
        <Box mt={6} display="flex" justifyContent="center" alignItems="center">
          <Avatar src="/static/home/olivier.png" />
          <Box ml={2}>
            <Typography variant="body1" color="textPrimary">
              Olivier Tassinari
              <Typography
                color="textSecondary"
                display="inline"
                component="span"
              >
                , co-creator of @MaterialUI
              </Typography>
            </Typography>
          </Box>
        </Box> */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <PricingCard
            cssRule={classes.product}
            imgUrl="/static/images/products/product_standard.svg"
            imgAlt="Product"
            // cardName="Covid19 Registrering"
            price="149 kr"
            subTitle="1 lokasjon / 1 QR kode"
            salePitch1="Ingen bindingstid"
            salePitch2="Ubegrenset support"
            SalePitch3="Oppbevaring og sletting av data"
          />
          <PricingCard
            cssRule={clsx(classes.product, classes.recommendedProduct)}
            textColor=""
            imgUrl="/static/images/products/product_premium--outlined.svg"
            imgAlt="Standard"
            // cardName="Covid19 Reg. +  Digitale menyer."
            price="249 kr"
            subTitle="3 lokasjoner / 3 QR koder"
            salePitch1="Ingen bindingstid"
            salePitch2="Ubegrenset support"
            SalePitch3="Oppbevaring og sletting av data"
          />
          <PricingCard
            cssRule={classes.product}
            imgUrl="/static/images/products/product_extended.svg"
            imgAlt="Product"
            // cardName="BTLR LITE"
            price="499"
            subTitle="3-10 lokasjoner / 3-10 QR koder"
            salePitch1="Ingen bindingstid"
            salePitch2="Ubegrenset support"
            SalePitch3="Oppbevaring og sletting av data"
          />
        </Grid>
      </Container>
      {/* </Container> */}
    </div>
  );
};

Testimonials.propTypes = {
  className: PropTypes.string
};

export default Testimonials;
