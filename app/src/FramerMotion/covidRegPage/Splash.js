import React, {useState, useEffect} from 'react'
import AnimatedForm from './AnimatedForm'
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
import Form from '../../views/covidReg/OverviewView/CovidForm'
import CovidForm from '../../views/covidReg/OverviewView/CovidForm';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
	},
	splasher: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: '100vw',
		background: '#AED581',
	}
}));

let currentWidth,
currentHeight
console.log('currentWidth', currentWidth)
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	currentWidth = width
	currentHeight = height
}


const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px)`,
    transition: {
      type: "spring",
      stiffness: 30,
			restDelta: 2,
			when: 'beforeChildren',
			staggerChildren: 20
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  }
};

// Motion values
const childLeft = {
	open: {
		opacity: 1,
		delay: 3,
		y: 0
	},
	closed: {
		opacity: 1,
		y: '-200vw',
		transition: {
			delay: 0.2,
			type: 'spring',
			stiffness: 100
			
		},
	}
}


const Splash = ({className, ...rest}) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
	const classes = useStyles();

	


	useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
		setTimeout(() => {
			toggleOpen()
		}, 200)
    window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
  }, []);

	console.log(windowDimensions, 'this is height')

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className={classes.splasher} variants={sidebar} />
		
      {/* <Navigation /> */}
			{/* <AnimatedForm /> */}
			<motion.div
				variants={childLeft}
			
			>
				<CovidForm />
			</motion.div>
    </motion.nav>
  );
};






export default Splash