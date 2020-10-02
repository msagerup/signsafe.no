import React, { useState, useEffect } from 'react';
import {
  useParams
} from "react-router-dom";
import * as Yup from 'yup';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Formik } from 'formik';
import axios from 'axios'
import {
  Box,
  Button,
  Card,
  CardContent,
	CardHeader,
	CardActionArea,
	CardMedia,
	CardActions,
  Checkbox,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  Link,
  TextField,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { closeModal } from 'src/slices/calendar';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    backgroundColor: theme.palette.common.white
	},
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
      fontSize: "30px"
    }
  },
  input2: {
    WebkitBoxShadow: "0 0 0 1000px white inset"
  }
}));


const Form = ({className, ...rest}) => {
  const classes = useStyles();
  const [isAlertVisible, setAlertVisible] = useState(false);
	let {id} = useParams();
	// Resonse from api call.
	const [response , setResponse] = useState({});
	// Values from form inputs.
	const [formValues, setFormValues] = useState({});
	const [firstName, setFirstName] = useState('');
	const[modalState, setModalState] = useState(false) 
	
	

// If there is anything in storage, get it.
  useEffect(() => {
		let formValuesFromStrg =localStorage.getItem('formValues');
		const convertFormValues = JSON.parse(formValuesFromStrg)
		// Set stored values to state if there is any.
		if (convertFormValues) {
			setFormValues(convertFormValues)
		}
		// if data from org name from storage matches what url path you are on, then you know they have been here before.,
			// alert about this.
			if(convertFormValues) {
				let idFromStorage = convertFormValues.visitName
				if(idFromStorage === id) {
					setModalState(true)
				}
		}
	}, [setFormValues])


	console.log('dette er values from storage', {formValues})
	console.log('ID FROM URL', id)

  const sendForm = async (values) => {
    console.log('Dette er values ', values)
    setFirstName(values.firstName);
    const data = await axios.post(`http://localhost:5000/signsafe-62b14/europe-west1/api/register/${id}`, {
      name: values.firstName + ' ' + values.lastName,
      phone: values.phone,
      other: values.other,
      policy: values.policy,
      email: values.email
    }).then((result => {
			setResponse(result)
      return result
    })).catch(err => {
			setResponse(err)
      return new Promise(err)
    })
    return data;
	}
	

	//  Show modal
	const showModal = () => {
		setModalState(true)
	}
	// Hide modal
	const hideModal = () => {
		setModalState(false)
	}

  return (
		<>
    <Formik
      initialValues={{
        email: '',
        phone: '',
				firstName: '',
				// secret: '',
				lastName: '',
				other: '',
        policy: false,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Please entere a valid e-mail'),
        phone: Yup.number().required('Please enter your phone number'),
        firstName: Yup.string().required('Required'),
				lastName: Yup.string().required('Required'),
				// secret: Yup.string(),
				other: Yup.string(),
        policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
				setSubmitting,
				
				
      }) => {
        try {
					
					// Save values to storage
					values.visitName = id
					localStorage.setItem('formValues', JSON.stringify(values));
					// Send data to database.
          await sendForm(values)
          setStatus({ success: true });
          setSubmitting(false);
          setAlertVisible(true)
          resetForm()
        } catch (err) {
					console.error(err)
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
				<>
					<Card>
						<CardHeader
						title= "SignSafe Covid Register " />
						<Divider />
						<CardContent>
							{isAlertVisible && (
								<Box mb={3}>
									<Alert
										onClose={() => setAlertVisible(false)}
										severity="success"
									>
										{response.status === 200 ? `Takk ${firstName}! Vi har sikkert lagret din registrering ved ${response.data.visitInfo.orgName}.`: ''}
									</Alert>
								</Box>
							)}
							{isSubmitting ? (
								<Box
									display="flex"
									justifyContent="center"
									my={5}
								>
									<CircularProgress />
								</Box>
							) : (
								<form onSubmit={handleSubmit}>
									<Grid
										container
										spacing={2}
									>
										<Grid
											item
											md={6}
											xs={12} 
										>
											<TextField
												error={Boolean(touched.firstName && errors.firstName)}
												fullWidth
												helperText={touched.firstName && errors.firstName}
												label="Fornavn"
												name="firstName"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.firstName}
												variant="outlined"
											/>
										</Grid>
										<Grid
											item
											md={6}
											xs={12}
										>
											<TextField
												error={Boolean(touched.lastName && errors.lastName)}
												fullWidth
												helperText={touched.lastName && errors.lastName}
												label="Etternavn"
												name="lastName"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.lastName}
												variant="outlined"
											/>
										</Grid>
									</Grid>
									<Box mt={2}>
										<TextField
											error={Boolean(touched.email && errors.email)}
											fullWidth
											helperText={touched.email && errors.email}
											label="E-post"
											name="email"
											onBlur={handleBlur}
											onChange={handleChange}
											type="email"
											value={values.email}
											variant="outlined"
										/>
									</Box>
									<Box mt={2}>
										<TextField
											error={Boolean(touched.phone && errors.phone)}
											fullWidth
											helperText={touched.phone && errors.phone}
											label="Telefon nummer"
											name="phone"
											onBlur={handleBlur}
											onChange={handleChange}
											type="number"
											value={values.phone}
											variant="outlined"
										/>
									</Box>
									<Box mt={2}>
										<TextField
                      autoFocus
											error={Boolean(touched.other && errors.other)}
											fullWidth
											helperText={touched.other && errors.other}
											label="Annet, f.eks: Møterom: 203"
											name="other"
											onBlur={handleBlur}
											onChange={handleChange}
								
											value={values.other}
											variant="outlined"
										/>
									</Box>
									{/* <Box mt={2}>
										<TextField
											error={Boolean(touched.secret && errors.secret)}
											fullWidth
											helperText={touched.secret && errors.secret}
											label={formValues.secret ? 'Passord lagret fra sist.' : 'Passord'}
											type={formValues.secret ? 'password' : 'text'}
											disabled = {formValues.secret ? true : false}
											name="secret"
											onBlur={handleBlur}
											onChange={handleChange}
											// defaultValue="Hello World"
											value={values.secret}
											variant="outlined"
										/>
									</Box> */}
									{/* <Box
										alignItems="center"
										display="flex"
										mt={2}
										ml={-1}
									>
										<Checkbox
											checked={values.policy}
											name="policy"
											onChange={handleChange}
										/>
										<Typography
											variant="body2"
											color="textSecondary"
										>Slett passord og data</Typography>
									</Box> */}
									<Box
										alignItems="center"
										display="flex"
										mt={2}
										ml={-1}
									>
										
										<Checkbox
											checked={values.policy}
											name="policy"
											onChange={handleChange}
										/>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Jeg har lest og forstått
											{' '}
											<Link
												component="a"
												href="#"
												color="secondary"
											>
												SignSave's policy
											</Link>
										</Typography>
									</Box>
									{Boolean(touched.policy && errors.policy) && (
										<FormHelperText error>
											{errors.policy}
										</FormHelperText>
									)}
									<Box mt={2}>
										<Button
											color="secondary"
											disabled={isSubmitting}
											fullWidth
											size="large"
											type="submit"
											variant="contained"
										>
											Registrer besøk
										</Button>
									</Box>
								</form>
							)}
						</CardContent>
					</Card>
				</>
      )}
    </Formik>
		{/* Modal */}
		<>
			<Rodal
				width = {370}
				height = {300}
				// measure = 'px'
				visible={modalState}
				onClose={hideModal} >
				<CardActionArea>
					<CardContent>
						<Typography  color="primary" gutterBottom variant="h1" component="h1" style={{textAlign: 'left'}} >
							Velkommen tilbake!
						</Typography>
						<Typography variant="body1" color="textSecondary" component="p" style={{textAlign: 'left' , marginBottom: '15px'}}>
							Hold my beer! I got this! :)
						</Typography>
						<Typography variant="body2" color="primary" component="p" style={{textAlign: 'left'}}>
							Fornavn: {formValues.firstName}
						</Typography>
						<Typography variant="body2" color="primary" component="p" style={{textAlign: 'left'}}>
							Etternavn: {formValues.lastName}
						</Typography>
						<Typography variant="body2" color="primary" component="p" style={{textAlign: 'left'}}>
							Epost: {formValues.email}
						</Typography>
						<Typography variant="body2" color="primary" component="p" style={{textAlign: 'left'}}>
							Telefon: {formValues.phone}
						</Typography>
						<Typography variant="body2" color="primary" component="p" style={{textAlign: 'left'}}>
							Du besøker: {formValues.visitName}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
					onClick= {async () => {
					await	sendForm(formValues)
					setModalState(false)
					}}
					size="small" color="primary">
						Send i vei!
					</Button>
					<Button 
					 onClick={hideModal}
					 size="small" color="primary">
						Jeg vil endre info
					</Button>
					{/* <Button size="small" color="primary">
						din data
					</Button> */}
				</CardActions>
			</Rodal>
		</>
		</>
  );
};

export default Form;


// TODO: 
//( DONE :  Legge til et secret ord , når man registrer seg, slik at man kan få spore tidligere besøk.) DONE
// NOW : Hvis man har brukt applikasjonen før på samme sted, tenger man ikke fylle inn.
// 1PASSORD er lagret fra storage. send dette og andre nye felt inn i database.
// 2. Liste tidligere besoek i ny card under formen. faa dette fra firebase return naar man submitter
// 3. Lage func på hvis det er funnet tidligere registreinger så vises en knapp som det står, treff. vis nå. 
// man må da skrive inne det hemmelioge ordert for å vise treffene.  (modal?)