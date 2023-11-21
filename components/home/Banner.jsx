"use client";
import React from "react";
import { Container, Typography, Box, styled } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerContainer = styled("div")(({ theme }) => ({
  "& .sliderBox": {
    margin: "0 auto",
    "& .bannerSection": {
      margin: "80px 0 20px",
      [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
        height: "206px",
        margin: "0px",
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: "91%",
        height: "150px",
        margin: "0px",
      },
      "& a": {
        display: "block",
        width: "100%",
        height: "100%",
        cursor: "pointer",
      },
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      },
    },
  },
}));

export default function Banner({ backgroundImages, redirect }) {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 5000,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  if (!Array.isArray(backgroundImages) || backgroundImages.length === 0) {
    return (
      <BannerContainer>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ marginTop: "100px" }}></Typography>
        </Container>
      </BannerContainer>
    );
  }

  return (
    <BannerContainer>
      <Box className="sliderBox">
        <Container maxWidth="lg">
          <Slider {...settings}>
            {backgroundImages.map((image, index) => (
              <Box key={index} className="bannerSection">
                <a href={redirect[index]} target="_blank" rel="noopener noreferrer">
                  <img src={image} alt="banner img" />
                </a>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>
    </BannerContainer>
  );
}