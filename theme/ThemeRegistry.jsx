"use client";

import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const themeOptions = {
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontWeight: 500,
      fontSize: 40,
      lineHeight: "60px",
      "@media(max-width:767px)": {
        fontSize: "24px !important",
        lineHeight: "42px",
      },
    },
    h2: {
      fontWeight: 400,
      fontSize: 42,
      lineHeight: "55px",
      wordBreak: "break-word",
      "@media(max-width:767px)": {
        fontSize: "30px !important",
      },
    },
    h3: {
      fontWeight: 400,
      fontSize: 37,
      color: "#161E29",
      "@media(max-width:767px)": {
        fontSize: "20px !important",
      },
    },
    h4: {
      fontWeight: 400,
      fontSize: 32,
      lineHeight: "45px",
      "@media(max-width:767px)": {
        fontSize: "18px !important",
      },
    },
    h5: {
      fontWeight: 400,
      fontSize: 22,
      "@media(max-width:767px)": {
        fontSize: "16px !important",
      },
    },
    h6: {
      fontWeight: 300,
      fontSize: 18,
      "@media(max-width:767px)": {
        fontSize: "14px !important",
      },
    },
    button: {
      textTransform: "capitalize",
      borderRadius: 27,
    },
    body2: {
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "25px",
      "@media(max-width:767px)": {
        fontSize: "12px",
        lineHeight: "22px",
      },
    },
    body1: {
      fontWeight: 300,
      lineHeight: "25px",
      fontSize: 12,
    },
  },
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "rgba(255, 255, 255, 0.60)",
    },
    background: {
      main: "#080031",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.60)",
    },
  },
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        root: { backgroundColor: "rgba(122, 105, 254, 0.25)" },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "240px",
          backgroundColor: "#e3e0c7 !important",
          padding: "20px",
        },
      },
    },
    MuiToolbar: { styleOverrides: { root: { padding: "0px" } } },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "30px",
          color: "#FFFFFF !important",
          padding: "12px",
          width: "50px",
          height: "50px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: { maxWidth: "1072px !important" },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: { width: "100% !important", margin: "0px !important" },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "#000",
          "&.Mui-selected, &.Mui-selected:hover": {
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.25)",
            background: "#7A69FE",
            color: "#FFF",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: { padding: "0px", border: "none" },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { color: "#222" },
        colorSecondary: {
          "&.Mui-focused": { color: "#222" },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        inputMultiline: { padding: "1px !important" },
        root: {
          borderBottom: "none !important",
          borderRadius: "5px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "none",
          },
        },
        notchedOutline: { background: "rgba(0, 0, 0, 0.05)" },
        input: {
          borderRadius: "5px",
          color: "#000",
          padding: "14px 14px",
          fontSize: "12px",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            "caret-color": "transparent",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#000",
          },
          "&:-internal-autofill-selected": { color: "#000" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: { padding: "20px", width: "100%" },
        elevation1: {
          background: "#FFF",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "none",
          border: "0.5px solid rgba(0, 0, 0, 0.25)",
        },
        elevation2: {
          background: "#FFF",
          borderRadius: "25px",
          padding: "15px",
          boxShadow: "none",
        },
        elevation3: {
          padding: "25px",
          background: "#fff",
          borderRadius: "20px",
          position: "relative",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.08)",
          "@media(maxWidth:768px)": { padding: "15px" },
        },
        root: { color: "#fff" },
      },
    },
    MuiPopover: {
      styleOverrides: { root: { zIndex: 99999 } },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          maxHeight: "245px !important",
          overflowY: "scroll !important",
          color:"#000 !important",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: { alignItems: "self-start", gutters: { paddingLeft: 0 } },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: "rgba(255, 255, 255, 0.40)" } },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: { padding: "4px", fontSize: "12px" },
        colorSecondary: { "&.Mui-checked": { color: "#000" } },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: { paddingBottom: "0", border: "none !important" },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: { fontSize: 16, color: "#000 !important", padding: "4px 10px" },
      },
    },
    MuiBackdrop: {
      styleOverrides: { root: { backgroundColor: "rgba(0, 0, 0, 0.75)" } },
    },
    MuiButton: {
      root: { textTransform: "capitalize" },
      styleOverrides: {
        containedSecondary: {
          color: "#fff",
          padding: "10px 30px",
          textTransform: "capitalize",
          fontSize: "16px",
          fontWeight: "400",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.60)",
          background: "#1da1f2",
          whiteSpace: "pre",
          "&:hover": {
            boxShadow: "none",
            color: "#fff",
            background: "#7ccdff",
            border: "1px solid rgba(255, 255, 255)",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          },
        },
        containedPrimary: {
          color: "#fff",
          padding: "10px 30px",
          textTransform: "capitalize",
          fontSize: "16px",
          fontWeight: "400",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.60)",
          background: "#db0000",
          whiteSpace: "pre",
          "&:hover": {
            boxShadow: "none",
            color: "#fff",
            background: "#ff5d5d",
            border: "1px solid rgba(255, 255, 255)",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          },
        },
        outlinedPrimary: {
          color: "#fff",
          padding: "10px 30px",
          textTransform: "capitalize",
          fontSize: "16px",
          fontWeight: "400",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.60)",
          whiteSpace: "pre",
          "&:hover": {
            boxShadow: "none",
            color: "#000",
            background: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          },
          "@media(maxWidth:768px)": { fontSize: "12px" },
        },
        text: {
          color: "#000",
          fontSize: "16px",
          borderRadius: "0px !important",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: { paperAnchorDockedLeft: { borderRight: "0" } },
    },
    MuiLink: {
      styleOverrides: {
        root: { textDecoration: "none !important", cursor: "pointer" },
      },
    },
  },
};
const theme = createTheme(themeOptions);

export default function ThemeRegistry({ children }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
