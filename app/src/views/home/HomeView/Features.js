import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 128
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

const Features = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Typography
          component="p"
          variant="overline"
          color="secondary"
          align="center"
        >
          Kom i gang med SignSafe
        </Typography>
        <Typography variant="h1" align="center" color="textPrimary">
          Slik fungerer det:
        </Typography>
        <Box mt={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>01</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    Registrer din bedrift
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Ingen nedlastning nødvendig. Vi sender deg nødvendig
                    informasjon og QR kode for å starte. Print og heng opp QR
                    kode. Tjenesten er nå klar til burk.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>02</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    Gjester registrer seg ved ankomst
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Dette er en selvbetjent løsning, som sparer deg som bedrift
                    for tid. Besøkende registrer seg enkelt ved å scanne QR kode
                    med mobilkamera.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>03</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    Smittesporing og GDPR
                  </Typography>
                  <Typography variant="body1" color="textPrimary" gutterBottom>
                    Ved påvist smittetilfelle vil du som bedrift ha tilgang til
                    portal for å enkelt kunne bistå kommune med smittesporing.
                    Dataen til gjester er sikret og vil bli slettet innen 10
                    dager.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

Features.propTypes = {
  className: PropTypes.string
};

export default Features;
