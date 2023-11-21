"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  styled,
  Grid,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MonitorIcon from "@mui/icons-material/Monitor";
import MemoryIcon from "@mui/icons-material/Memory";
import CameraIcon from "@mui/icons-material/Camera";
import StorageIcon from "@mui/icons-material/Storage";
import LanguageIcon from "@mui/icons-material/Language";
import ProductDetailsSpecs from "./ProductDetailsSpecs";
import ArticleCard from "./ArticleCard";
import VideoCard from "./VideoCard";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), {
  loading: () => <p>Loading Slider...</p>,
  ssr: false,
});

const ProductDetailContainer = styled("div")(({ theme }) => ({
  "& .productCard": {
    padding: "210px 0px 32px 0px",

    [theme.breakpoints.down("sm")]: {
      padding: "100px 0px 24px 0px",
    },
    "& .productImg": {
      height: "400px !important",
      "& img": {
        margin: "0 auto",
        padding: "20px 0px",
        width: "100%",
        maxHeight: "400px",
        height: "100%",
        display: "block",
        objectFit: "contain",
        transition: "2s",
        "&:hover": {
          transform: "scale(1.1)",
        },
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: "20px",
        "& img": {
          textAlign: "center",
        },
      },
    },
    "& .productDetails": {
      height: "100%",
      "& h3": {
        textTransform: "capitalize",
        marginBottom: "16px",
      },
      "& h5": {
        marginBottom: "16px",
        fontWeight: "500",

        "& span": {
          fontWeight: "300",
          marginLeft: "5px",
        },
      },
      "& h6": {
        fontWeight: "500",
      },
      "& .keyFeatures": {
        background: "#fff",
        padding: "20px 40px",
        borderRadius: "20px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        "& .specsValues": {
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          "& .specsIcons": {
            color: "#e40909c7",
            marginRight: "16px",
          },
          "& h6": {
            marginRight: "16px",
          },
          "& p": {
            fontSize: "14px",
          },
        },
        [theme.breakpoints.down("sm")]: {
          padding: "20px 10px",
        },
      },
    },
    "& .MuiGrid-root": {
      paddingLeft: "0px",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
    "& .MuiGrid-item": {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0px !important",
      },
    },
  },
}));
const SliderContainer = styled("div")(({ theme }) => ({
  "& .slider-container": {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%",
    },
    "& .slider-item": {
      maxWidth: "100px",
      height: "100px",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "60px",
        height: "60px",
      },
      padding: "5px",
      border: "2px solid #a9a9a95e",
      "&.selected": {
        border: "2px solid #ff0000",
      },
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      },
    },
  },
}));

function ProductDetail({ product, relatedArticles, relatedVideos }) {
  const router = useRouter();
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    vertical: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          horizontal: true,
          vertical: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          horizontal: true,
          vertical: false,
        },
      },
    ],
  };

  const specifications = [
    {
      id: 1,
      question: "Display",
      answer: `${product.screen_size} inch | Resolution: ${product.resolution}`,
    },
    {
      id: 2,
      question: "Processor",
      answer: product.processor,
    },
    {
      id: 3,
      question: "Camera",
      answer: `Front: ${product.front_camera_resolution} | Rare: ${product.back_camera_resolution}`,
    },
    {
      id: 4,
      question: "Storage",
      answer: `${product.ram} GB / ${product.storage_capacity} GB`,
    },
    {
      id: 5,
      question: "Operating System",
      answer: product.operating_system,
    },
    {
      id: 6,
      question: "Battery Capacity",
      answer: `${product.battery_capacity} mAh`,
    },
    {
      id: 7,
      question: "Network & Connectivity",
      answer: `${product.sim_card_slots}, Network : ${product.network_connectivity},
       Bluetooth: ${product.bluetooth_version},
        Wi-fi : ${product.wi_fi}`,
    },
  ];

  const colors = product.color.split(" | ");

  const [selectedImage, setSelectedImage] = useState(product.img1);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  const handleImageHover = (image) => {
    setSelectedImage(image);
  };

  if (!product) {
    return (
      <Typography variant="h4" sx={{ paddingTop: "110px" }}>
        Product not found
      </Typography>
    );
  }

  const renderRelatedArticles = () => {
    if (relatedArticles.length === 0) {
      return (
        <Box mb={2}>
          <Typography variant="h4">Related Articles</Typography>
          <Typography variant="h6" color="error">
            No related articles found.
          </Typography>
        </Box>
      );
    }
    return (
      <Box>
        <Typography variant="h4">Related Articles</Typography>
        <Box className="relatedArticles">
          {relatedArticles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </Box>
      </Box>
    );
  };
  const renderRelatedVideos = () => {
    if (relatedVideos.length === 0) {
      return (
        <Box mb={2}>
          <Typography variant="h4">Related Videos</Typography>
          <Typography variant="h6" color="error">
            No related video found.
          </Typography>
        </Box>
      );
    }
    return (
      <Box>
        <Typography variant="h4">Related Videos</Typography>
        <Box className="relatedArticles">
          {relatedVideos.map((video) => (
            <VideoCard key={video.video_id} video={video} />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <ProductDetailContainer>
      <Container maxWidth="lg">
        <Box className="productCard">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={2}>
                <Grid item sm={3} style={{ paddingLeft: "0px" }}>
                  <Box>
                    <SliderContainer>
                      <Box className="slider-container">
                        <Slider {...settings}>
                          {product && product.img1 && (
                            <Box
                              key="img1"
                              className={`slider-item ${
                                selectedImage === product.img1 ? "selected" : ""
                              }`}
                              onClick={() => handleImageSelect(product.img1)}
                              onMouseEnter={() =>
                                handleImageHover(product.img1)
                              }
                            >
                              <img
                                src={product.img1}
                                alt={product.model_name}
                              />
                            </Box>
                          )}
                          {product && product.img2 && (
                            <Box
                              key="img2"
                              className={`slider-item ${
                                selectedImage === product.img2 ? "selected" : ""
                              }`}
                              onClick={() => handleImageSelect(product.img2)}
                              onMouseEnter={() =>
                                handleImageHover(product.img2)
                              }
                            >
                              <img
                                src={product.img2}
                                alt={product.model_name}
                              />
                            </Box>
                          )}
                          {product && product.img3 && (
                            <Box
                              key="img3"
                              className={`slider-item ${
                                selectedImage === product.img3 ? "selected" : ""
                              }`}
                              onClick={() => handleImageSelect(product.img3)}
                              onMouseEnter={() =>
                                handleImageHover(product.img3)
                              }
                            >
                              <img
                                src={product.img3}
                                alt={product.model_name}
                              />
                            </Box>
                          )}
                          {product && product.img4 && (
                            <Box
                              key="img4"
                              className={`slider-item ${
                                selectedImage === product.img4 ? "selected" : ""
                              }`}
                              onClick={() => handleImageSelect(product.img4)}
                              onMouseEnter={() =>
                                handleImageHover(product.img4)
                              }
                            >
                              <img
                                src={product.img4}
                                alt={product.model_name}
                              />
                            </Box>
                          )}
                        </Slider>
                      </Box>
                    </SliderContainer>
                  </Box>
                </Grid>
                <Grid item sm={9}>
                  <Box className="productImg">
                    <img
                      src={selectedImage}
                      alt={product.model_name}
                      loading="lazy"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box className="productDetails">
                <Typography variant="h3">
                  {product.brandname}&nbsp;{product.model_name}
                </Typography>
                <Box className="keyFeatures" mt={2}>
                  <Typography variant="h5">Key Features</Typography>
                  <Box className="specsValues">
                    <Box>
                      <MonitorIcon className="specsIcons" />
                    </Box>
                    <Box>
                      <Typography variant="h6">Display</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {product.screen_size}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="specsValues">
                    <Box>
                      <MemoryIcon className="specsIcons" />
                    </Box>
                    <Box>
                      <Typography variant="h6">Processor</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {product.processor}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="specsValues">
                    <Box>
                      <CameraIcon className="specsIcons" />
                    </Box>
                    <Box>
                      <Typography variant="h6">Camera</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {product.camera_resolution}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="specsValues">
                    <Box>
                      <StorageIcon className="specsIcons" />
                    </Box>
                    <Box>
                      <Typography variant="h6">Storage</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {product.ram}&nbsp;GB&nbsp;/&nbsp;
                        {product.storage_capacity}&nbsp;GB
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="specsValues">
                    <Box>
                      <LanguageIcon className="specsIcons" />
                    </Box>
                    <Box>
                      <Typography variant="h6">OS</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {product.operating_system}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="h6">Available Colors</Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      {colors.map((color, index) => (
                        <Box key={index}>
                          <Box
                            sx={{
                              background: color,
                              height: "30px",
                              width: "30px",
                              boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
                              borderRadius: "50%",
                            }}
                          ></Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginRight: "10px" }}
                  >
                    Articles
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.open(product.buylink1, "_blank")}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <ProductDetailsSpecs
            specifications={specifications}
            product={product}
          />
        </Box>
        {renderRelatedArticles()}
        {renderRelatedVideos()}
      </Container>
    </ProductDetailContainer>
  );
}
export default ProductDetail;
