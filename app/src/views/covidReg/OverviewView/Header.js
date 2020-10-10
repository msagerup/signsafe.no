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
  root: {
		textAlign: 'left'
	},
  action: {
    backgroundColor: theme.palette.common.white
	},
	splashText: {
		fontSize: '2.4rem'
	},
  image: {
    width: '200px',
    maxHeight: 400
	},
	subtext: {
		marginTop: '15px',
		// fontFamily: 'Roboto Mono, monospace',
		// fontWeight: '200',
		fontSize: '1.4rem',
		letterSpacing: '3px',
		fontFamily: 'Shadows Into Light, cursive'
	},
	splashName: {
		fontSize: '4rem',
		fontFamily: 'Shadows Into Light, cursive',
		letterSpacing: '2px',
		transform: 'rotate(3deg)',
		transformOrigin: '0%',
		background: 'linear-gradient(to right, #6D8E46 0%, #fff 60%)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent'
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
			<Box
				mt={5}
			>
				<img src="/static/images/small.png" alt="" className={classes.image}/>
			</Box>
			<Box
				mt={5}
			>
				<Typography
					color="primary"
					variant="h2"
					className={classes.subtext}
				>
					Velkommen til: 
				</Typography>
			</Box>
			<Box
			ml={1}
			mb={3}
			>
				<div className={classes.splashName}>{id}</div>
			</Box>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
