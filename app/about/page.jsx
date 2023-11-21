"use client"
import React from "react";
import { Typography, Box, Grid, Button, Container } from "@mui/material";
import Link from "next/link";
import styled from "@emotion/styled";

const AboutContainer = styled("div")(({ theme }) => ({
  "& .aboutMainBox": {
    padding: "80px 0px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "60px 0px 0px !important",
    },
    "& .aboutText": {
      padding: "32px 24px",
      backgroundColor: "#e4e4e4ac",
      borderRadius: "20px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      "& h2": {
        fontWeight: "500",
        fontSize: "42px",
        marginBottom: "16px",
      },
      "& h6": {
        fontWeight: "400",
        fontSize: "16px",
        marginTop: "8px",
      },
    },
    "& .aboutImages": {
      maxWidth: "675px",
      height: "auto",
      width: "100%",
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        minHeight: "148px",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      },
    },
  },
}));

const About = () => {
  return (
    <AboutContainer>
      <Container maxWidth="lg">
        <Box className="aboutMainBox">
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} md={8}>
              <Box className="aboutText">
                <Typography variant="h2">32Mobiles</Typography>
                <Typography variant="h4">
                  India’s trending Gadget Discovery Platform
                </Typography>
                <Typography variant="h6">
                  Launched in 2023, 32mobiles.com is the largest gadget
                  discovery site in India, focused on smartphones. It provides
                  information and interactive tools to help people decide which
                  phone to buy and where to buy it from.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="aboutImages displayCenter">
                <img
                  src="https://i.ibb.co/yFbrPRJ/about1.jpg"
                  alt="about img 1"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="aboutImages displayCenter">
                <img
                  src="https://i.ibb.co/86MWd57/about2.jpg"
                  alt="about img2"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Box className="aboutText">
                <Typography variant="h6">
                  32mobiles.com is visited by millions gadget enthusiasts every
                  month, and ranks among the top websites in India. 32mobiles
                  has a team of 45+ people based out of Gurgaon (HO).
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box className="aboutText" my={2}>
            <Typography variant="h6">
              32mobiles.com works on the leading electronics and telecom brands
              (Samsung, Apple, Oppo, OnePlus, Vivo, etc.), as well as leading
              e-tailers (Amazon, Flipkart etc.), to provide them with innovative
              ways to reach 32mobiles.com’s gadget enthusiast community for
              promoting their products and offers.
            </Typography>
            <Box mt={2} align="center">
              <Box mt={2} align="center">
                <Link href="/products" passHref>
                  <Button variant="contained" color="secondary">
                    View Products
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </AboutContainer>
  );
};

export default About;
