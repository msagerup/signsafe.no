import React from 'react'
import { Frame } from "framer"
import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import { useDimensions } from "../../utils/use-dimentions";
import {
	makeStyles,
	Grid
} from '@material-ui/core';


// Motion values
const containerVariants = {
	hidden: {
		
		// x: '-100vw',
		backgroundColor: 'yellow',
		height: '400px',
		width: '0'
	},
	visable: {
		scale: [1,1],
		// x: 0,
		height: '900px',
		width: '100px',
		backgroundColor: 'red',
		transition: {
			yoyo: 10, 
			delay: 0.2,
			type: 'spring',
			stiffness: 100,
			mass: 1,
			damping: 10,
			when: 'beforeChildren',
			staggerChildren: 0.4
		},
	}
}

// Motion values
const nextVariants = {
	hidden: {
		opacity: 0,
		x: '-100vw'
	},
	visable: {
		opacity: 1,
		x: 0,
		transition: {
			delay: 0.2,
			type: 'spring',
			stiffness: 100
			
		},
	}
}


const childrenVariants = {
	hidden: {
		opacity: 0
	},
	visable: {
		opacity: 1
	}
}

const Tester = () => {
	return (
		<motion.div
			variants={containerVariants}
			initial= 'hidden'
			animate = 'visable'
		>
			<motion.h2
				variants={childrenVariants}
			>
				Hello
			</motion.h2>

			<motion.h2
				variants={childrenVariants}
			>
				Hello again</motion.h2>
		</motion.div>
	)
}

export default Tester