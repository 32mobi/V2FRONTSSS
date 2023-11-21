import React from "react";
import { Box, Dialog, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const VideoModalContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
});

const ModalContent = styled("div")({
  backgroundColor: "#fff",
  borderRadius: "0px",
  padding: "25px",
  position: "relative",
  width: "80%",
  maxWidth: "800px",
  height: "400px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  textAlign: "center",
});

const VideoModal = ({ video, isOpen, onClose }) => {
  if (!isOpen || !video) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} onClick={onClose}>
      <VideoModalContainer>
        <ModalContent>
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
          <Box
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              cursor: "pointer",
              fontSize: "20px",
              color: "#000"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseIcon onClick={onClose}/>
          </Box>
        </ModalContent>
      </VideoModalContainer>
    </Dialog>
  );
};

export default VideoModal;