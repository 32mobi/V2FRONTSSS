"use client"

import React, { useState, lazy, Suspense } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  InputBase,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import VideoModal from "../VideoModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), {
  loading: () => <p>Loading Slider...</p>,
  ssr: false,
});

const VideosContainer = styled("div")(({ theme }) => ({
  "& .videoContainer": {
    "& .videoElement": {
      maxWidth: "234px",
      background: "#e0e0e0",
      paddingBottom: "10px",
      cursor: "pointer",
      marginRight: "16px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "285px",
        marginRight: "0px",
      },
      "& iframe": {
        height: "150px",
        width: "100%",
      },
      "& h5": {
        fontSize: "14px",
      },
    },
    "& .listContainer": {
      overflowY: "scroll",
      height: "650px",
      [theme.breakpoints.down("sm")]: {
        height: "325px",
      },
    },
    "& .topVideosList": {
      padding: "10px",
      "& h6": {
        fontSize: "14px",
      },
      "&:hover": {
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      },
    },
    "& .trendingVideos": {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      },
    },
  },
}));

const RecomendedVideos = lazy(() => import("./RecomendedVideos"));
const TrendingVideos = lazy(() => import("./TrendingVideos"));

export default function Videos({ videoPosted }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const closeVideoModal = () => {
    setModalOpen(false);
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 4500,
    autoplaySpeed: 3000,
    slidesToShow: 4,
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
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const filteredVideos = videoPosted.filter((video) => {
    const query = searchQuery.toLowerCase();
    const title = video.title.toLowerCase();
  
    if (query) {
      return title.includes(query) && video.recom === "Yes";
    } else {
      return video.recom === "Yes";
    }
  });
  

  const trendingVideos = [...videoPosted]
    .sort((a, b) => b.date - a.date)
    .slice(0, 6);

  return (
    <VideosContainer>
      <Box className="videoContainer">
        <Container maxWidth="lg">
          <Box className="videoContainerBox" mb={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} md={9}>
                <Box mb={2}>
                  <Box mb={2} className="displaySpacebetween">
                    <Box>
                      <Typography variant="h5">Recommended</Typography>
                    </Box>
                    <Box
                      style={{
                        background: "#e8e8e8",
                        padding: "7px 10px",
                        margin: "0px 10px",
                        borderRadius: "10px",
                      }}
                    >
                      <InputBase
                        placeholder="Search videos..."
                        startAdornment={
                          <SearchIcon sx={{ color: "#51087e" }} />
                        }
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </Box>
                  </Box>
                  <Box>
                    {filteredVideos.length > 0 ? (
                      filteredVideos.length === 1 ? (
                        <Box
                          className="videoElement"
                          key={filteredVideos[0].title}
                          onClick={() => openVideoModal(filteredVideos[0])}
                        >
                          <iframe
                            src={filteredVideos[0].videoLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                          <Box>
                            <Box ml={1}>
                              <Typography variant="h5">
                                {filteredVideos[0].title}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <Slider {...settings}>
                          {filteredVideos.map((video, index) => (
                            <Suspense
                              fallback={<div>Loading...</div>}
                              key={index}
                            >
                              <RecomendedVideos
                                onClick={() => openVideoModal(video)}
                                video={video}
                              />
                            </Suspense>
                          ))}
                        </Slider>
                      )
                    ) : (
                      <Typography variant="h6">
                        No matching videos found.
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box mb={2}>
                  <Box>
                    <Typography variant="h5">Trending</Typography>
                  </Box>
                </Box>
                <Box className="trendingVideos">
                  {trendingVideos.map((video, index) => (
                    <Suspense fallback={<div>Loading...</div>} key={index}>
                      <TrendingVideos
                        onClick={() => openVideoModal(video)}
                        video={video}
                      />
                    </Suspense>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box className="mobileList">
                  <Box mb={2}>
                    <Typography variant="h5">Top Videos</Typography>
                  </Box>
                  <Box className="listContainer">
                    {videoPosted.map((video) => (
                      <Box key={video.title} my={1} className="topVideosList">
                        <Typography
                          variant="h6"
                          sx={{ cursor: "pointer" }}
                          className="displayAlign"
                          onClick={() => openVideoModal(video)}
                          video={video}
                        >
                          <PlayCircleFilledIcon
                            sx={{
                              color: "#cd201f",
                              height: "50px",
                              width: "50px",
                            }}
                          />{" "}
                          &nbsp; {video.title}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={closeVideoModal}
      />
    </VideosContainer>
  );
}
