"use client"
import React, { useState, lazy, Suspense } from "react";
import { Box, Typography } from "@mui/material";

const LazyVideoModal = lazy(() => import("../VideoModal"));

const TrendingVideos = ({ video }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box className="videoElement" mb={2} mr={2}>
      <iframe
        src={video.video_url}
        title="YouTube video player"
        frameBorder="0"
        controls
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <Box>
        <Box ml={1} onClick={openModal}>
          <Typography variant="h5">
            {video.title.length > 23
              ? video.title.slice(0, 23) + "..."
              : video.title}
          </Typography>
        </Box>
      </Box>
      {isModalOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyVideoModal video={video} isOpen={isModalOpen} onClose={closeModal} />
        </Suspense>
      )}
    </Box>
  );
};

export default TrendingVideos;
