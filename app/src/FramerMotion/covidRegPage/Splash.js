import React, {useState, useLayoutEffect} from "react";

import { motion } from "framer-motion";
import styled from "@emotion/styled";


const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
	padding-top: 0px;
`;

const SplashBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 300px;
	background: #fff;

`;


const variants = {
	hidden: {
		opacity: 0,
		background: "#282C34",
		transition: {
			// duration: 20.5
			when: "afterChildren",
			staggerChildren: 0.3
		},
		// size: '0%',
		height: "1vh",
		width: "100vw",
		borderRadius: ""
	},
	visible: (height = 1000, width = 1000) =>  ({
		opacity: 1,
		background: "#282C34",
		transition: {
			type: "spring",
			damping: 80,
			mass: 5.6,
			times: 1,
			delay: 0.4,
			repeatDelay: 1,
			stiffness: 1200,
			when: "beforeChildren",
			staggerChildren: 0.4
		},
		width: "15vw",
		height: "3vh",
		scale: 3,
		// height: [null, "10%", '60%', '60px'],
		// borderRadius: [null, "20%", "50%", "20%"]
		borderRadius: "0%"
	})
};

const rotate = {
	hidden: {
		x: 0,
		opacity: 0,
		background: "#282C34",
		width: "15vw",
		height: "3vh",
		scale: 1,
		// originX: 0.5,
		// originY: 0.5,

		// transition: { delay: 10 },
	},
	visible: {
		opacity: 100,
	
		// originX: 0.5,
		// originY: 0.5,
		scale: 2,
		// scale: 2,
		background: "#282C34",
		clipPath: `circle(200px at center)`,
		height: "3vh",
		width: "15vw",
		// height: "20vh",
		// width: '5vw',
		// height: '10vh',
		// originX: 0.5,
		// originY: 0.5,
		// 
		borderRadius: '0%',
		// // width: "15vw",
		// width: '142.857143%',
		transition:{
			type: "spring",
			damping: 20,
			mass: 1.6,
			times: 1,
			repeatDelay: 1,
			stiffness: 1400,		
		},
		
	}
};

const splash = {
	hidden: {
		x: 0,
		opacity: 0,
		background: "#282C34",
		scale: 1,
		// originX: 0.5,
		// originY: 0.5,
width: "20vw",
		height: "10vh",
		// transition: { delay: 10 },
	},
	visible: {
		opacity: 100,
		// originX: 0.5,
		// originY: 0.5,
		scale: 8,
		// scale: 2,
		background: "#282C34",
		// width: "100%",
		// height: "100%",
		// clipPath: `circle(200px at center)`,
		rotate: 30,

		// height: "20vh",
		// width: '5vw',
		// height: '10vh',
		// originX: 0.5,
		// originY: 0.5,
		// 
		borderRadius: '0%',
		// // width: "15vw",
		// width: '142.857143%',
		transition:{
			type: "spring",
			damping: 20,
			mass: 7.6,
			times: 1,
			repeatDelay: 1,
			stiffness: 1400,		
		},
		
	}
};







const Intro = () => {

	// TODO ! CHange the last animition from spring to ease.

  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={variants} >
				{/* /ref= {containerRef} */}
        {/* <Frame variants={rotate} /> */}
        <motion.div variants={rotate} style={{position: 'absolute',}} />

		
				<motion.div variants={splash} />
			
        {/* <Frame variants={splash}/>  */}

      </motion.div>
    </>
  );
};

const Splash = () => {
	// const containerRef = useRef(null);
	// const [width, height] = useWindowSize(containerRef);
  return (
    <Root>
      <Intro />
    </Root>
  );
};



// function useWindowSize() {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener('resize', updateSize);
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
// }

// function ShowWindowDimensions(props) {
// 	const [width, height] = useWindowSize();
// 	console.log(width, height)
//   return <span>Window size: {width} x {height}</span>;
// }

export default Splash;