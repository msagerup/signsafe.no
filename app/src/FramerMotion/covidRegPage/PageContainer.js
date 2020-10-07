import * as React from "react"
import { Frame } from "framer"
import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import { useDimensions } from "../../utils/use-dimentions";
import {
	makeStyles,
	Grid
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
	},
	greenLine: {
		background: '#fff',
		height: '100px'
	}
}));

const sidebar =  {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const PageContainer = () => {
	const classes = useStyles();
	const [animate, cycle] = useCycle(
    { scale: 1, rotate: 0 },
    { scale: 1.0, rotate: 90 },
    { scale: 2, rotate: 90 },
    { scale: 100, rotate: 90 }
  );
	const containerRef = useRef(null);
	// const { height } = useDimensions(containerRef);
  return (
		<Frame
      animate={animate}
      onTap={() => cycle()}
      size={150}
      radius={30}
			background={"#fff"}
    >
			Hello
		</Frame>



    // <motion.nav
    //   initial={false}
    //   animate={isOpen ? "open" : "closed"}
    //   custom={height}
    //   ref={containerRef}
    // >
    //   <motion.div className={classes.greenLine} variants={sidebar} />
    //   {/* <Navigation /> */}
		// 	<button toggle={() => toggleOpen}> Hello</button>
    // </motion.nav>
  )
}

export default PageContainer