import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Hidden,
  Typography,
  makeStyles
} from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    backgroundColor: theme.palette.common.white
	},
	splashText: {
		fontSize: '2.4rem'
	},

	subText1 : {
		fontSize: '1.5rem'
	},

  image: {
    width: '100%',
    maxHeight: 400
  }
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();
	const { user } = useAuth();
	let {id} = useParams()

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Box
						mt={5}
					>
						<Typography
							className={classes.splashText}
							color="textPrimary"
						>
							SignSafe - Covid19 Register.
							{' '}
						</Typography>
					</Box>
					<Box
						mb={5}
					>
						<Typography
							className = {classes.subText1}
							color="textPrimary"
						>
							Velkommen til {id}
						</Typography>
						<Typography
							variant="h4"
							color="textPrimary"
						>
							Flott at du tar tiden til å registrere deg.
						</Typography>
					</Box>
          
        </Grid>
        <Hidden smDown>
          <Grid
            item
            md={6}
          >
            
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
