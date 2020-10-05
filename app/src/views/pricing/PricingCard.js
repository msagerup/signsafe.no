import React, {useState} from 'react'
import {
  Box,
  Button,
  Paper,
	Typography,
	Divider,
	Grid,
  makeStyles
} from '@material-ui/core';
import PricingModal from './PricingModal';
import PricingForm from './PricingForm'
import { rest } from 'lodash';
import { SettingsPowerRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    height: '100%',
    paddingTop: 120,
    paddingBottom: 120
  },
  card: {
    '&:hover': {
      backgroundColor: theme.palette.background.dark
    }
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

const PricingCard = ({imgUrl, imgAlt, cardName, price, subTitle, salePitch1, salePitch2, SalePitch3, cssRule, }) => {
  const [isOpened, setOpened] = useState(false);

  const cardInfo = {
    price, 
    subTitle
  }
  
  const handleModal = () => {
    setOpened(true)
  }
  
  const handleClose = () => {
    setOpened(false);
  };

	const classes = useStyles();
	return (
		<>
      <Grid
        item
        md={4}
        xs={12}
      >
        <Paper
        className={cssRule}
        elevation={1}
      >
        <img
          // alt={imageUrl}
          className={classes.productImage}
          src={imgUrl}
        />
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="inherit"
        >
          {cardName}
        </Typography>
        <div>
          <Typography
            component="span"
            display="inline"
            variant="h3"
            color="textPrimary"
          >
            {price} { }
          </Typography>
          <Typography
            component="span"
            display="inline"
            variant="subtitle2"
            color="textSecondary"
          >
            / mnd
          </Typography>
        </div>
        <Typography
          variant="overline"
          color="textSecondary"
        >
          {subTitle}
        </Typography>
        <Box my={2}>
          <Divider />
        </Box>
        <Typography
          variant="body2"
          color="textPrimary"
        >
          {salePitch1}
          <br />
          {salePitch2}
          <br />
          {SalePitch3}

          <br />
        </Typography>
        <Box my={2}>
          <Divider />
        </Box>
        <Button
          variant="contained"
          fullWidth
          className={classes.chooseButton}
          onClick = {() => handleModal()}
          
        >
          Velg
        </Button>
      </Paper>
      </Grid>
      <PricingModal
        open={isOpened}
        onClose={handleClose}
        // card={card}
        // list={list}
        order={cardInfo}
      >

      </PricingModal>
    </>
		
	)
}

export default PricingCard;