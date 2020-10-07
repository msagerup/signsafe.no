import React, {useEffect} from 'react';

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


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const OverviewView = () => {
	const classes = useStyles();
	const [animate, cycle] = useCycle(
    { scale: 1, rotate: 0 },
    { scale: 1.0, rotate: 90 },
    { scale: 2, rotate: 90 },
    { scale: 9, rotate: 90 }
	);
	

  return (
    <div
      // className={classes.root}
      title="SignSafe Covid-19"
	>		
			<Grid
				style = {{height: '500px'}}
				container
				direction="row-reverse"
				justify="center"
				alignItems="center"
			>
				<Grid item>
					<Frame
						animate={
							{
							scale: [1, 2, 2, 1, 100],
							rotate: [0, 0, 270, 270, 0],
							borderRadius: ["20%", "20%", "50%", "50%", "20%"]
							}}
						transition={{
							duration: 2,
							ease: "easeInOut",
							times: [0, 0.2, 0.5, 0.8, 1],
							repeatDelay: 1
						}}
						onTap={() => cycle()}
						size={150}
						radius={30}
						background={"#9ccc65"}
					>
						{/* <PageContainer /> */}
						
					</Frame>
			</Grid>

      {/* <Container maxWidth="lg"> */}
				{/* <PageContainer /> */}
        {/* <Header />
        <Box mt={3}>
          <CovidForm />
        </Box> */}
      {/* </Container> */}
			</Grid>
    </div>
  );
};

export default OverviewView;
