import React, { useState } from 'react';
import {
  useParams
} from "react-router-dom";
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios'
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
import { Alert } from '@material-ui/lab';


const Form = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);
  let {id} = useParams()
  console.log(id)

  const sendForm = async (values) => {
    console.log(values, 'verdier....')
    const data = await axios.post(`http://localhost:5000/signsafe-62b14/europe-west1/api/register/${id}`, {
      name: values.firstName,
      phone: values.phone,
      email: values.email
    }).then((result => {
      console.log(result)
      return result
    })).catch(err => {
      return new Promise(err)
    })
    return data;
    
  
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  return (
    <Formik
      initialValues={{
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        policy: false,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Please entere a valid e-mail'),
        phone: Yup.number().required('Please enter your phone number'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await sendForm(values)
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
          <CardHeader title="SignSafe - Covid19" />
          <Divider />
          <CardContent>
            {isAlertVisible && (
              <Box mb={3}>
                <Alert
                  onClose={() => setAlertVisible(false)}
                  severity="info"
                >
                  This is an info alert - check it out!
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
                      label="First Name"
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
                      label="Last Name"
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
                    label="Email Address"
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
                    label="Phone number"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.phone}
                    variant="outlined"
                  />
                </Box>
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
                    I have read the
                    {' '}
                    <Link
                      component="a"
                      href="#"
                      color="secondary"
                    >
                      Terms and Conditions
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
                    Registrer visit
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

export default Form;
