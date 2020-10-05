import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import wait from 'src/utils/wait';
import axiosInstance from 'src/utils/axios';
import { result } from 'lodash';

const BasicForm = ({pakke}) => {
	const [isAlertVisible, setAlertVisible] = useState(false);
	const [response, setResponse] = useState({});
	const [userName, setUsername]= useState('')

	

  // Send form 
  const sendForm = async (values) => {
		const data = await axios.post(`https://europe-west1-signsafe-62b14.cloudfunctions.net/api/leads`, {
			...values
		}).then((result => {
			setResponse(result)
			setUsername(result.data.costumerInfo.firstName)
			return result;
		})).catch((err => {
			console.log(err)
		}))
  }

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        sendMessage: '',
        option: pakke,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        sendMessage: Yup.string().required('Required'),
        option: Yup.string(),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // NOTE: Make API request
          await sendForm(values)
					resetForm();
					setAlertVisible(true)
          setStatus({ success: true });
          setSubmitting(false);
        } catch (err) {
          console.error(err);
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
        <Card>

          <CardContent>
            {isAlertVisible && (
              <Box mb={3}>
                <Alert
                  onClose={() => setAlertVisible(false)}
                  severity={response.status == 200 ? 'success' : 'error'}
                >
                  {response.status === 200 ? `Takk for interessen ${userName}` : 'Beklager, det er en server feil. Din beskjed er ikke registrert'}
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
                    label="Epost"
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
                    error={Boolean(touched.option && errors.option)}
                    fullWidth
                    helperText={touched.option && errors.option}
                    label="Modul"
                    name="option"
                    onBlur={handleBlur}
                    disabled
                    onChange={handleChange}
                    value={values.option}
                    variant="outlined"
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    error={Boolean(touched.sendMessage && errors.sendMessage)}
                    fullWidth
                    helperText={touched.sendMessage && errors.sendMessage}
                    label="Melding"
                    name="sendMessage"
                    multiline
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.sendMessage}
                    variant="outlined"
                  />
                </Box>
               
                
                <Box mt={2}>
                  <Button
                    color="secondary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Kontakt oss
                  </Button>
                </Box>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
};

export default BasicForm;
