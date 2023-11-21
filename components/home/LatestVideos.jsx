import React, { useState } from "react";
import { mobileListArr, videoYoutubeArr } from "@/data";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import YouTubeIcon from "@mui/icons-material/YouTube";

const LatestVideosContainer = styled("div")(({ theme }) => ({
  "& .main-video-container": {
    padding: "24px 0px",
    "& .sub-video-container": {
      background: "#fff",
      borderRadius: "15px",
      padding: "20px",
    },
    "& .mobileList": {
      background: "#fff",
      borderRadius: "15px",
      padding: "20px",
      "& h6": { fontSize: "14px", padding: "3px 0px" },
    },
    "& .playList": {
      marginRight: "8px",
      width: "50%",
      overflowX: "hidden",
      overflowY: "scroll",
      height: "400px",
      [theme.breakpoints.down("sm")]: {
        height: "220px",
        marginRight: "0px",
        width: "100%",
      },
    },
    "& .playList-items": {
      margin: "10px 0px",
      cursor: "pointer",
    },
    "& .videoContainer": {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        height: "auto",
      },
    },
    "& .videoBox": {
      width: "100%",
      "& iframe": {
        height: "412px",
        maxWidth: "600px",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
          height: "200px",
          marginTop: "16px",
        },
      },
    },
    "& .iconBox": {
      height: "40px",
      width: "60px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "& .iconBtn": {
        height: "30px",
        width: "30px",
        color: "#fff",
      },
    },
    "& .MuiGrid-item": {
      [theme.breakpoints.down("sm")]:{
        paddingLeft:"0px !important",
        paddingTop:"0px !important",
      }
    },
  },
}));

const LatestVideos = () => {
  const [currentVideo, setCurrentVideo] = useState(videoYoutubeArr[0].url);

  const handleVideoClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
  };

  return (
    <LatestVideosContainer>
      <Box className="main-video-container">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} style={{paddingLeft:"0px"}}>
              <Box className="sub-video-container">
                <Box mb={2}>
                  <Typography variant="h5">Latest Videos</Typography>
                </Box>
                <Box className="displayAlign videoContainer">
                  <Box className="playList">
                    {videoYoutubeArr.map((video, index) => (
                      <Box
                        key={video.id}
                        onClick={() => handleVideoClick(video.url)}
                        className="displayAlign playList-items"
                      >
                        <Box className="iconBox" sx={{ background: "#cd201f" }}>
                          <YouTubeIcon className="iconBtn" />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ marginLeft: "8px", fontSize: "12px" }}
                        >
                          {video.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box className="videoBox">
                    <iframe
                      src={currentVideo}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="mobileList">
                <Box mb={2}>
                  <Typography variant="h5">Top Mobile Phone</Typography>
                </Box>
                <Box>
                  {mobileListArr.map((item) => (
                    <Box key={item.name} my={1}>
                      <Typography variant="h6" className="displayAlign">
                        <SmartphoneIcon sx={{ color: "#b8daed" }} /> &nbsp;{" "}
                        {item.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LatestVideosContainer>
  );
};

export default LatestVideos;
