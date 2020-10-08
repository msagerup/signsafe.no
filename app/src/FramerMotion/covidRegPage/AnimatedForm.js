import React from 'react'
import { Frame } from "framer"
import {
  Box,
  Container
} from '@material-ui/core';
import CovidForm from '../../views/covidReg/OverviewView/CovidForm'
import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import { useDimensions } from "../../utils/use-dimentions";
import {
	makeStyles,
	Grid
} from '@material-ui/core';
import MenuItem from './MenuItem'
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const AnimatedForm = () => (
	<motion.div style={{}} 
	variants={variants}
	initial='hidden'
	animate='visable'
	>
      <CovidForm />
  </motion.div>
);

const itemIds = [0];

export default AnimatedForm