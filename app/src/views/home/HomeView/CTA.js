import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 128
  },
  browseButton: {
    marginLeft: theme.spacing(2)
  },
  iconSize: {
    fontSize: '3rem'
  }
}));

const CTA = ({ className, ...rest }) => {
  const classes = useStyles();
  const history = useHistory()

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          align="center"
          color="textPrimary"
        >
          Prøv applikasjonen 
        </Typography>
        <Typography
          variant="h1"
          align="center"
          color="secondary"
        >
          Trykk på pilen nedenfor
        </Typography>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
        <IconButton
        color="secondary"
        endIcon={<SendIcon>send</SendIcon>}
        onClick = {() => history.push('/app/covidreg/test1')}
        variant="contained"
      >
        <SendIcon
        className={classes.iconSize}
        />
        </IconButton>
          
        </Box>
      </Container>
    </div>
  );
};

CTA.propTypes = {
  className: PropTypes.string
};

export default CTA;
