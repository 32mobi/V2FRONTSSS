"use client"
import Link from "next/link";
import { Box, styled } from "@mui/material";

const NotFoundPage = styled("div")(({ theme }) => ({
  "& .notFoundContainer": {
    width: "100%",
    background: "#fff",
    height: "calc(100vh - 150px)",
    flexDirection: "column",
    "& img": {
      maxWidth: "600px",
      width: "100%",
    },
    [theme.breakpoints.down("sm")]:{
        height: "auto", 
    }
  },
}));

export default function NotFound() {
  return (
      <NotFoundPage>
        <Box className="notFoundContainer displayCenter">
          <Box mt={2}>
            <img
              src="/images/not.jpg"
              alt="Page not found"
              loading="lazy"
            />
          </Box>
          <Box>
            <Link href="/">Go back to Home</Link>
          </Box>
        </Box>
      </NotFoundPage>
  );
}
