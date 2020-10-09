import * as React from "react";
import { render } from "react-dom";
import { Frame, Size, Stack } from "framer";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import {}
// import "./styles.css";

import { addPropertyControls, ControlType } from "framer";

// const list = {
//   hidden: {
//     opacity: 0,
//     x: -100,
//     transition: { when: "afterChildren" },
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { when: "beforeChildren" },
//   },
// }

// // Child variants
// const item ={
//   hidden: {
//     opacity: 0,
//     x: -100,
//     transition: { when: "afterChildren" },
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { when: "beforeChildren" },
//   },
// }

// export function MyComponent() {
//   const variants = {
//     hidden: (custom) => ({
//       opacity: 0,
//       transition: { delay: custom * 0.5 },
//     }),
//   }
//   return (
//     <Stack>
//       <Frame
//         custom={0}
//         variants={variants}
//         animate={"hidden"}
//       />
//       <Frame
//         custom={1}
//         variants={variants}
//         animate={"hidden"}
//       />
//       <Frame
//         custom={2}
//         variants={variants}
//         animate={"hidden"}
//       />
//     </Stack>
//   )
// }

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Intro = () => {
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
      height: "10%",
      width: "100vw",
      borderRadius: ""
    },
    visible: {
      opacity: 1,
      background: "#282C34",
      transition: {
        type: "spring",
        damping: 80,
        mass: 4.6,
        times: 1,
        repeatDelay: 1,
        stiffness: 1200,
        when: "beforeChildren",
        staggerChildren: 0.7
      },
      width: "15vw",
      height: "10%",
      scale: 1,
      // height: [null, "10%", '60%', '60px'],
      // borderRadius: [null, "20%", "50%", "20%"]
      borderRadius: "0%"
    }
  };

  const rotate = {
    hidden: {
      x: 0,
      opacity: 0,
      background: "#282C34",
      // height: "10vw",
      height: "109px",
      width: "167px",
      scale: 1

      // transition: { delay: 10 },
    },
    visible: {
      opacity: 100,
      scale: 3,
      rotate:180,
      borderRadius: '50%',
      

      // background: "#282C34",
      // scale: 3,
      // rotate: 405,
      // borderRadius: '50%',
      y: 0,
      transition:{
        type: "spring",
        damping: 20,
        mass: 2.6,
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
      // height: "10vw",
      height: "109px",
      width: "167px",
      scale: 3

      // transition: { delay: 10 },
    },
    visible: {
      opacity: 100,
      scale: 10,
      // rotate:180,
      borderRadius: '0%',
      

      // background: "#282C34",
      // scale: 3,
      // rotate: 405,
      // borderRadius: '50%',
      y: 0,
      transition:{
        type: "spring",
        damping: 2044,
        bounce: 0.25,
        // mass: 25.6,
        // times: 1,
        repeatDelay: 1,
        stiffness: 1400,
      },
    }
	};
	
	// TODO ! CHange the last animition from spring to ease.

  return (
    <>
      <Frame initial="hidden" animate="visible" variants={variants}>
        <Frame variants={rotate} />
        <Frame variants={splash} />

      </Frame>
    </>
  );
};

const Splash = () => {
  return (
    <Root>
      <Intro />
      <h2>hello</h2>
    </Root>
  );
};

export default Splash;