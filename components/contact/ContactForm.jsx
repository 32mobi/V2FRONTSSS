import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Box,
  TextField,
  Button,
  FormHelperText,
  Typography,
} from "@mui/material";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formInitialSchema = {
    fullName: "",
    email: "",
    message: "",
  };

  const formValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .min(2, "Enter a valid name.")
      .max(25, "Full name should not exceed 25 characters")
      .required("Full Name is required."),
    email: yup
      .string()
      .email("Please enter a valid email.")
      .max(256, "Should not exceed 256 characters.")
      .required("Email is required."),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true);

      const formData = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: phone,
        message: values.message,
      };

      const response = await fetch(
        "https://three2mobiles.onrender.com/api/contact-messages/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Form submitted successfully");
        resetForm();
        setPhone("");
      } else {
        const errorData = await response.json();
        setErrorMessage("Error submitting form: " + JSON.stringify(errorData));
        console.error("Error submitting form:", errorData);
      }
    } catch (error) {
      setErrorMessage("An error occurred while submitting the form.");
      console.error("An error occurred while submitting the form:", error);
    } finally {
      setIsLoading(false);
      if (successMessage) {
        alert(successMessage);
      }
    }
  };

  return (
    <>
      <Box py={{ sm: "1", md: "3" }}>
        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
        <Formik
          initialValues={formInitialSchema}
          validationSchema={formValidationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            touched,
            values,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                sx={{
                  marginTop: "40px",
                  "@media(maxWidth:768px)": { marginTop: "8px" },
                }}
              >
                <Typography variant="subtitle1">Fullname</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Full Name"
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  error={touched.fullName && Boolean(errors.fullName)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormHelperText error>
                  {touched.fullName ? errors.fullName : ""}
                </FormHelperText>
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormHelperText error>
                  {touched.email ? errors.email : ""}
                </FormHelperText>
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle1">Mobile No.</Typography>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  name="phoneNumber"
                  onChange={(phone) => setPhone(phone)}
                />
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle1">Message</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Your message"
                  type="text"
                  name="message"
                  multiline
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                />
              </Box>
              <Box mt={2} align="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ContactForm;
