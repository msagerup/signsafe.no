import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Input,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 200,
    paddingBottom: 200,
    [theme.breakpoints.down('md')]: {
      paddingTop: 60,
      paddingBottom: 60
    }
  },
  technologyIcon: {
    height: 40,
    margin: theme.spacing(1)
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '90%',
      height: 'auto',
      transform: 'rotateY(-35deg) rotateX(15deg)',
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
  const history = useHistory();
  const [value, setValue] = useState('');

  const handleChange = event => {
    event.persist();
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async event => {
    alert('A name was submitted: ' + value);
    history.push(`/app/projects/${value}`);
    event.preventDefault();
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="overline" color="secondary">
                Welcome to Menyr
              </Typography>
              <Typography variant="h1" color="textPrimary">
                Enter restaurant code:
              </Typography>
              <Input
                fullWidth
                onChange={handleChange}
                type="number"
                placeholder={`Legg inn kode`}
              />
              <Tooltip title="Send">
                <IconButton
                  onClick={handleSubmit}
                  color={value.length > 0 ? 'primary' : 'default'}
                >
                  <SendIcon />
                </IconButton>
              </Tooltip>
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
