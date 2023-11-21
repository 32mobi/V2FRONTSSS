"use client"
import React, { useState, lazy, Suspense } from "react";
import { Box, Typography } from "@mui/material";

const LazyVideoModal = lazy(() => import("../VideoModal"));

const RecomendedVideos = ({ video }) => {
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
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <Box>
        <Box ml={1} onClick={openModal}>
          <Typography variant="h5">
            {video.title.length > 18
              ? video.title.slice(0, 18) + "..."
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

export default RecomendedVideos;
