import React from 'react'
import { Frame } from "framer"
import {
  Box,
  Container
} from '@material-ui/core';
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

const Navigation = () => (
  <motion.div style={{position: 'absolute'}} variants={variants}>
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.div>
);

const itemIds = [0];

export default Navigation