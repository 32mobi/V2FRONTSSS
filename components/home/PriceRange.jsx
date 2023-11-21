import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Typography, styled } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { useRouter } from "next/navigation";

const SliderContainer = styled("div")(({ theme }) => ({
  "& .slider-container": {
    padding: "24px 0px",
  },
  "& .price-item": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    maxWidth: "220px",
    padding: "5px 15px",
    width: "100%",
    height: "150px",
    cursor: "pointer",
    borderRadius: "15px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "70% !important",
      height: "120px",
      paddingTop: "10px",
    },
    [theme.breakpoints.between("sm" & "md")]: {
      maxWidth: "200px",
      height: "150px",
      paddingTop: "20px",
    },
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    },
    "& h5": {
      color: "#fff",
      textAlign: "center",
      "& span": {
        fontWeight: "600",
      },
    },
    "& .smartphn": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

const PriceRange = ({ price }) => {
  const router = useRouter();
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (!price || price.length === 0) {
    return null;
  }

  return (
    <SliderContainer>
      <Container maxWidth="lg">
        <Box my={2}>
          <Typography variant="h5">Featured Mobile Brands</Typography>
        </Box>
        <Slider {...settings}>
          {price.map((priceRange) => (
            <Box
              key={priceRange.id}
              className="price-item"
              sx={{ background: priceRange.color_code }}
              onClick={() =>
                router.push(
                  `/products/?minPrice=5000&maxPrice=${priceRange.price}`
                )
              }
            >
              <Box className="smartphn" mb={1}>
                <SmartphoneIcon
                  sx={{
                    color: "#b8daed",
                    height: "70px",
                    width: "70px",
                    "@media(maxWidth:768px)": {
                      height: "50px",
                      width: "50px",
                    },
                  }}
                />
              </Box>
              <Typography variant="h5">
                Best Phones Under <span>{priceRange.price}</span>
              </Typography>
            </Box>
          ))}
        </Slider>
      </Container>
    </SliderContainer>
  );
};

export default PriceRange;
