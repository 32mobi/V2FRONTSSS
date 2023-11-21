"use client";
import React from "react";
import Logo from "@/components/Logo";
import { styled, Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";

const IconBoxes = styled("div")(({ theme }) => ({
  "& .iconBox": {
    height: "30px",
    width: "30px",
    borderRadius: "10px",
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "& .iconBtn": {
      fontSize: "22px",
      color: "#fff",
    },
  },
}));

const MainComponent = styled("div")(({ theme }) => ({
  "& .mainBox": {
    backgroundColor: "#fff",
    "& .copyRightBox": {
      padding: "30px 0",
      [theme.breakpoints.down("sm")]: {
        padding: "15px 0",
      },
      "& h6": {
        cursor: "pointer",
        fontWeight: "400",
        color: "#000",
      },
      "& .footerBtn": {
        display: "flex",
        flexDirection: "row",
      },
      "& .copyBox": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "8px",
        "& p": {
          color: "#000",
        },
      },
    },
    "& .iconContainer": {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      "& .logoBox": {
        [theme.breakpoints.down("sm")]: {
          marginBottom: "16px",
        },
      },
    },
  },
}));

const socailMediaLinks = [
  {
    label: "FacebookIcon",
    href: "/",
    background: "#4260ff",
  },
  {
    label: "TwitterIcon",
    href: "/",
    background: "#1da1f2",
  },
  {
    label: "YouTubeIcon",
    href: "/",
    background: "#cd201f",
  },
  {
    label: "WhatsAppIcon",
    href: "/",
    background: "#25d366",
  },
];

const FooterData = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const Footer = () => {
  const router = useRouter();
  const { pathname } = router;

  const getScoialMedia = () => {
    return (
      <IconBoxes className="displayRow">
        {socailMediaLinks.map((social) => (
          <Box
            key={social.label}
            className="iconBox"
            sx={{ background: social.background }}
            onClick={() => router.push(social.href)}
          >
            {social.label === "FacebookIcon" && (
              <FacebookIcon className="iconBtn" />
            )}
            {social.label === "TwitterIcon" && (
              <TwitterIcon className="iconBtn" />
            )}
            {social.label === "YouTubeIcon" && (
              <YouTubeIcon className="iconBtn" />
            )}
            {social.label === "WhatsAppIcon" && (
              <WhatsAppIcon className="iconBtn" />
            )}
          </Box>
        ))}
      </IconBoxes>
    );
  };

  const getFooterButtons = () => {
    return FooterData.map(({ label, href }) => {
      const isActive = pathname === href;
      return (
        <Link href={href} key={label}>
          <Button
            variant="text"
            color="primary"
            className={`menuButton ${isActive ? "activeButton" : ""}`}
            sx={{ marginLeft: "30px", fontWeight:"300" }}
          >
            {label}
          </Button>
        </Link>
      );
    });
  };

  return (
    <MainComponent>
      <Box className="mainBox mainBox1">
        <Container maxWidth="lg">
          <Box className="copyRightBox">
            <Box className="displaySpacebetween iconContainer">
              <Box className="logoBox">
                <Logo />
              </Box>
              <Box className="footerBtn">
                <Box>{getScoialMedia()}</Box>
              </Box>
            </Box>
            <Box className="copyBox">
              <Box>
                <Typography variant="body2" color="rgba(0, 0, 0, 0.60)">
                  Copyright©2023. Created by 32mobiles.com
                </Typography>
              </Box>

              <Box>{getFooterButtons()}</Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </MainComponent>
  );
};

export default Footer;
