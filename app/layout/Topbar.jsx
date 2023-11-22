"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Drawer,
  Container,
  IconButton,
  Hidden,
  Button,
  List,
  ListItem,
  ListItemText,
  styled,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "@/components/Logo";

const DesktopContainer = styled("div")((theme) => ({
  "& .searchBar": {
    padding: "2px 15px",
    borderRadius: "10px",
    background: "#e8e8e8",
    maxWidth: "620px",
    width: "100%",
    ["@media(max-width:1024px)"]: {
      maxWidth: "400px !important",
    },
    "& .inputBaseElement": {
      width: "100%",
      minWidth: "500px",
      "@media(max-width:1024px)": {
        minWidth: "400px !important",
      },
    },
  },
}));

const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Articles",
    href: "/articles",
  },
  {
    label: "Videos",
    href: "/videos",
  },
];

const Topbar = () => {
  const pathname = usePathname();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      setState((prevState) => ({
        ...prevState,
        mobileView: window.innerWidth < 1024,
      }));
    };

    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);

    return () => {
      window.removeEventListener("resize", setResponsiveness);
    };
  }, []);

  const handleDrawerOpen = useCallback(
    () => setState((prevState) => ({ ...prevState, drawerOpen: true })),
    []
  );
  const handleDrawerClose = useCallback(
    () => setState((prevState) => ({ ...prevState, drawerOpen: false })),
    []
  );

  const appLogo = useMemo(
    () => (
      <Box>
        <Link href="/">
          <Logo className="logoImg" />
        </Link>
      </Box>
    ),
    []
  );

  const getMenuButtons = useMemo(
    () =>
      headersData.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Link href={href} key={label}>
            <Button
              variant="text"
              color="primary"
              className={`menuButton ${isActive ? "activeButton" : ""}`}
              onClick={() => {
                if (mobileView) {
                  handleDrawerClose();
                }
              }}
              sx={{ marginRight: "30px" }}
            >
              {label}
            </Button>
          </Link>
        );
      }),
    [headersData, pathname, mobileView, handleDrawerClose]
  );

  const DisplayDesktop = React.memo(() => (
    <DesktopContainer>
      <Toolbar className="topbarmainBox" sx={{ marginTop: "16px" }}>
        <Box>{appLogo}</Box>
        <Box>{getMenuButtons}</Box>
      </Toolbar>
    </DesktopContainer>
  ));

  const displayMobile = useCallback(
    () => (
      <Toolbar>
        <Hidden xsDown>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerClose}
            PaperProps={{
              style: {
                width: 240,
              },
            }}
          >
            <List>
              <ListItem
                button
                onClick={() => {
                  router.push("/");
                  handleDrawerClose();
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    style: {
                      color: "#000",
                      marginLeft: "20px",
                    },
                  }}
                />
              </ListItem>
              <Box>{appLogo}</Box>
              {headersData.map(({ label, href }) => (
                <Link href={href} key={label}>
                  <ListItem
                    button
                    key={label}
                    onClick={() => {
                      handleDrawerClose();
                    }}
                  >
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        style: {
                          color: "#000",
                          marginLeft: "20px",
                        },
                      }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        </Hidden>
        <Box className="topbarmainBox">
          <Box>{appLogo}</Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-haspopup="true"
            onClick={handleDrawerOpen}
          >
            <MenuIcon sx={{ color: "#51087e" }} />
          </IconButton>
        </Box>
      </Toolbar>
    ),
    [drawerOpen, handleDrawerClose, appLogo, headersData]
  );

  const displayDesktop = useCallback(
    () => <DisplayDesktop />,
    [DisplayDesktop]
  );

  return (
    <>
      <AppBar
        elevation={0}
        style={{
          background: "#fff",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
        }}
      >
        <Container className={""} maxWidth="lg">
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>
    </>
  );
};

export default Topbar;
