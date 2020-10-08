import React, {useEffect, useState} from 'react';
import {
  Box,
  Container,
	makeStyles,
	Grid
} from '@material-ui/core';
import { Frame } from "framer"
import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import { useDimensions } from "../../../utils/use-dimentions";
import Page from 'src/components/Page';
import Header from './Header';
import CovidForm from './CovidForm';
// Framer 
import PageContainer from '../../../FramerMotion/covidRegPage/PageContainer';
import Tester from '../../../FramerMotion/covidRegPage/tester'
import Splash from '../../../FramerMotion/covidRegPage/Splash'



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
	},
	test: {
		color: 'red'
	}
}));

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};


const OverviewView = () => {
	const [show, handleShow] = useState(false)
	const [show2, handleShow2] = useState(false)

	const classes = useStyles();
  return (
		
    <div
      // className={classes.root}
      title="SignSafe Covid-19"
	>		
			<Splash />
    </div>
  );
};

export default OverviewView;



// Example
// <Box mt={3}>
// {show ? <Tester /> : ''}
// </Box> 