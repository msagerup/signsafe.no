import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Toolbar,
	Hidden,
	Divider,
  IconButton,
  Link,
  makeStyles
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import Logo from 'src/components/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 100
  },
  toolbar: {
    height: 64
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium
	},
	divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const TopBar = ({ onMobileNavOpen }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {/* <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden> */}
        <Box
          ml={2}
          flexGrow={1}
        />
				<Divider className={classes.divider} />
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/"
          underline="none"
          variant="body2"
        >
          Home  
        </Link>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default TopBar;
