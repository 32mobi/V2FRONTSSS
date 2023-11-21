"use client";
import React from "react";
import { Box, Container, Grid } from "@mui/material";
import ContactStatics from "@/components/contact/ContactStatics";
import ContactForm from "@/components/contact/ContactForm";
import styled from "@emotion/styled";

const ContactContainer = styled("div")(({ theme }) => ({
  "& .contactBox": {
    margin: "60px 0 45px",
    [theme.breakpoints.down("sm")]: {
      margin: "60px 0px",
    },
    "& .react-tel-input .form-control": {
      width: "100%",
      height: "45px",
      background: "#dfdfdf7b",
    },
    "& a": {
      textDecoration: "none",
      color: "#676767",
    },
    "& .staticIcons": {
      color: "#ec3333d0",
      borderRadius: "50%",
      padding: "8px",
      fontSize: "35px",
      background: "#ff535358",
    },
    "& .MuiGrid-item": {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0px !important",
        paddingTop: "0px !important",
      },
    },
  },
}));

const Contact = () => {
  return (
    <ContactContainer>
      <Container maxWidth="lg">
        <Box className="contactBox">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <ContactStatics />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <ContactForm />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ContactContainer>
  );
};

export default Contact;
