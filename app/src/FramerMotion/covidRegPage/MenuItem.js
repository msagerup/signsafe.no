import * as React from "react";
import { motion } from "framer-motion";
import {
	makeStyles,
	Grid
} from '@material-ui/core';
import CovidForm from '../../views/covidReg/OverviewView/CovidForm'



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
		width: '300px',
		background: '#AED581',
	},
	iconPlaceholder : {
		width: '40px',
		height: '40px',
		borderRadius: '50%',
		flex: '40px, 0',
		marginight: '20px',
	}
}));


const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const MenuItem = ({ i }) => {
	const classes = useStyles();
  const style = { border: `2px solid ${colors[i]}` };
  return (
		<div style={{width: '100vw'}}>
    <motion.div
			style={{height: '30px !important'}}
      variants={variants}
      // whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.99 }}
    >
			<CovidForm />
      
      {/* <div className="text-placeholder" style={style} /> */}
    </motion.div>
		</div>
  );
};

export default MenuItem