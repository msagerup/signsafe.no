import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import PricingCard from './PricingCard';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    height: '100%',
    paddingTop: 120,
    paddingBottom: 120
  },
  splashText: {
    fontSize: '2.5rem',
    color: theme.palette.text.primary
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
  },
  productImage: {
    borderRadius: theme.shape.borderRadius,
    position: 'absolute',
    top: -24,
    left: theme.spacing(3),
    height: 48,
    width: 48,
    fontSize: 24
  },
  recommendedProduct: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  chooseButton: {
    backgroundColor: theme.palette.common.white
  }
}));

const PricingView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Pricing">
      {/* <Container maxWidth="sm">
        <Typography
          align="center"
          className={classes.splashText}
        >
          SafeSign - Covid19 register.
        </Typography>
        <Box mt={3}>
          <Typography
            align="left"
            variant="subtitle2"
            color="textSecondary"
          >
            Vi registrerer deres kunder digitalt. 
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus distinctio natus quas architecto debitis dolore dignissimos reprehenderit quae doloribus consequatur.
          </Typography>
        </Box>
      </Container> */}
      <Box mt="160px">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <PricingCard
              cssRule={classes.product}
              imgUrl="/static/images/products/product_standard.svg"
              imgAlt="Product"
              cardName="Covid19 Registrering"
              price="145KR"
              subTitle="En adresse."
              salePitch1="Registrerings punkt ved disk"
              salePitch2="Innsikt i antall registrerte"
              SalePitch3="Sikker oppbevaring av person info"
            />
            <PricingCard
              cssRule={clsx(classes.product, classes.recommendedProduct)}
              textColor=""
              imgUrl="/static/images/products/product_premium--outlined.svg"
              imgAlt="Standard"
              cardName="Covid19 Reg. +  Digitale menyer."
              price="235KR"
              subTitle="+5 adresser"
              salePitch1="Digial Meny"
              salePitch2="Covid19 registrering modul."
              SalePitch3="Sikker oppbevaring av person info"
            />
            <PricingCard
              cssRule={classes.product}
              imgUrl="/static/images/products/product_extended.svg"
              imgAlt="Product"
              cardName="BTLR LITE"
              price="330KR"
              subTitle="10 + Adresser."
              salePitch1="Digial Meny"
              salePitch2="Covid19 registrering modul og sikkert data lagring."
              SalePitch3="Motta bestillinger og betalinger, full oversikt over stock, m.m"
            />
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};

export default PricingView;
