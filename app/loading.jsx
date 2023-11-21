import React from "react";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box className="secureBanner">
      <Box className="main-navigation">
        <Box className="bgImagecir">
          <img
            src="/images/loading/frame1.png"
            className="bgcircular bgx2"
            alt="loading img"
          />
        </Box>
        <Box className="bgImagecir">
          <img
            src="/images/loading/bgCircular_22.png"
            className="bgcircular"
            alt="loading img"
          />
        </Box>
        <Box className="bgImagecir">
          <img
            src="/images/loading/frame2.png"
            className="bgcircular bgx1"
            alt="loading img"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;