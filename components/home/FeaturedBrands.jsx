"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

const BrandContainer = styled("div")(({ theme }) => ({
  "& .brand-container": {
    "& .brand-item": {
      maxWidth: "200px",
      height: "150px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "82%",
        height: "130px",
      },

      "& img": {
        width: "100%",
        height: "100%",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease",
      },
    },
  },
}));

const FeaturedBrands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://three2mobiles.onrender.com/api/brands/",
          {
            next: {
              revalidate: 3600,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error(error);
        setBrands([]);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <BrandContainer>
      <Box className="brand-container">
        <Container maxWidth="lg">
          <Box my={2}>
            <Typography variant="h5">Featured Mobile Brands</Typography>
          </Box>
          <Slider {...settings}>
            {brands.map((brand) => (
              <Box key={brand.brand_id} className="brand-item">
                {brand.name && (
                  <Link
                    href={`/products/?brand=${brand.name.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={brand.brand_cdn_link} alt={brand.name} />
                  </Link>
                )}
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>
    </BrandContainer>
  );
};

export default FeaturedBrands;
