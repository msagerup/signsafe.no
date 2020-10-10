import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Form from './Form';
import CookiesNotification from '../../../components/CookiesNotification'
import Header from './Header'
import Page from '../../../components/Page'
import TopBar from '../../../layouts/DocsLayout/TopBar'

const useStyles = makeStyles((theme) => ({
  root: {
		backgroundColor: theme.palette.background.dark,
		position: 'relative'
	},
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  overline: {
    marginTop: theme.spacing(1)
  }
}));

const CovidForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [statistics, setStatistics] = useState(null);

  const getStatistics = useCallback(async () => {
    try {
      const response = await axios.get('/api/projects/overview/statistics');
  
      if (isMountedRef.current) {
        setStatistics(response.data.statistics);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  if (!statistics) {
    return null;
  }

  return (
    <Page
		className={classes.root}
		>	
			<Box
			pb={7}
			>
				<TopBar />
		  </Box>
			<Card
				className={clsx(classes.root, className)}
				{...rest}
			>
				<Grid
					alignItems="center"
					container
					justify="center"
				>
					<Grid
						className={classes.item}
						item
						lg={12}
						md={12}
						sm={12}
						xs={12}
					>
						<Form />
					</Grid>        
				</Grid>
			</Card>
				<CookiesNotification />
    </Page>
  );
};

CovidForm.propTypes = {
  className: PropTypes.string
};

export default CovidForm;
