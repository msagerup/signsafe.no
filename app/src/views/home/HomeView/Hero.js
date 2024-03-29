import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 200,
    paddingBottom: 200,
    [theme.breakpoints.down('md')]: {
      paddingTop: 30,
      paddingBottom: 60
    }
  },
  technologyIcon: {
    maxWidth: '100%',
    margin: theme.spacing(1)
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '100%',
      height: 'auto',
      // transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16]
    }
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '90%',
      height: 'auto'
    }
  }
}));

const Hero = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              flexDirection="column"
              // justifyContent="center"
              height="100%"
            >
              <img
                alt="Javascript"
                className={classes.technologyIcon}
                src="/static/home/home.logo.png"
              />
              <Typography variant="overline" color="secondary">
                KOM I GANG
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Vi tar smittervern på alvor. Registrer besøkende for enklere
                smittesporing. Dette for å kunne varsle ansatte og gjester ved
                påvist Covid-19. Begynn med besøksregistrering i dag.
              </Typography>

              <Box mt={3}>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      Print
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      plakat
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      Scan
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      QR kode
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h1" color="secondary">
                      Registrer
                    </Typography>
                    <Typography variant="overline" color="textSecondary">
                      Besøkende
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box position="relative">
              <div className={classes.shape}>
                <img alt="Shapes" src="/static/home/shapes.svg" />
              </div>
              <div className={classes.image}>
                <img alt="Presentation" src="/static/home/home.poster.png" />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

Hero.propTypes = {
  className: PropTypes.string
};

export default Hero;
