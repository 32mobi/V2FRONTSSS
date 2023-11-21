import React, { useState, Suspense } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import VideoModal from "../VideoModal";

const VideoCard = ({ video }) => {
  const cardStyle = {
    margin: "0px 16px 16px 0px",
    maxWidth: "100%",
    width: "218px",
    height: "auto",
    cursor:"pointer",
    "@media(maxWidth:768px)": {
      maxWidth: "300px",
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  return (
    <Card style={cardStyle}>
      <CardContent onClick={() => openModal(video)}>
        <Box>
          <iframe
            src={video.video_url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <Typography variant="subtitle1" sx={{color:"#000"}}>{video.title}</Typography>
        </Box>
      </CardContent>

      {isModalOpen && selectedVideo && (
        <Suspense fallback={<div>Loading...</div>}>
          <VideoModal
            video={selectedVideo}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </Suspense>
      )}
    </Card>
  );
};

export default VideoCard;
