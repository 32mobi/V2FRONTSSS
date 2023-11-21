"use client";
import React from "react";
import { styled } from "@mui/system";
import { Typography, Grid, Container, Box, useTheme } from "@mui/material";

const FeatureArticleContainer = styled("div")(({ theme }) => ({
  "& .featured-container": {
    "& .featured-box": {
      padding: "24px 10px",
      background: "#fff",
      boxShadow: "rgba(100, 100, 111, 0.2) 0 7px 29px 0",
    },
    "& .articleContainer": {
      cursor: "pointer",
    },
    "& .MuiGrid-item": {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0px !important",
      },
    },
  },
}));
const Overlay = styled("div")(() => ({
  background: "rgba(0, 0, 0, 0.5)",
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  "&:hover": {
    background: "rgba(0, 0, 0, 0.3)",
  },
}));

const ArticleBox = ({ article, index, onClick, height, variant }) => (
  <Box
    className={`articleContainer ${index + 1}`}
    onClick={onClick}
    style={{
      width: "100%",
      height: height,
      position: "relative",
      marginBottom: index === 0 ? "8px" : 0,
    }}
  >
    <img
      src={article.image_url}
      alt={article.title}
      style={{
        width: "80%",
        height: "80%",
        objectFit: "contain",
        display: "block",
        margin: "0 auto",
        paddingTop: "20px",
      }}
    />
    <Overlay />
    <Box
      my={2}
      sx={{
        position: "absolute",
        bottom: "0px",
        margin: "10px",
      }}
    >
      <Typography variant={variant} sx={{ color: "#fff" }}>
        {article.title}
      </Typography>
    </Box>
  </Box>
);

const FeaturedArticles = ({ articlesBlog }) => {
  const theme = useTheme();
  const recentArticles = Array.isArray(articlesBlog)
    ? articlesBlog
        .sort(
          (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
        )
        .slice(0, 4)
    : [];

  return (
    <FeatureArticleContainer>
      <Box className="featured-container">
        <Container maxWidth="lg">
          <Box className="featured-box" sx={{ padding: "24px 10px", background: "#fff", boxShadow: "rgba(100, 100, 111, 0.2) 0 7px 29px 0" }}>
            <Box my={2}>
              <Typography variant="h5">Featured Articles</Typography>
            </Box>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  paddingLeft: "0px",
                  [theme.breakpoints.down("sm")]: { marginBottom: "8px" },
                }}
              >
                {recentArticles[0] && (
                  <ArticleBox
                    article={recentArticles[0]}
                    index={0}
                    onClick={() => window.open(`/articles/${recentArticles[0].article_id}`, "_blank")}
                    height={460}
                    variant="h6"
                  />
                )}
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  paddingTop: "0px",
                }}
              >
                <Grid container spacing={1}>
                  {recentArticles.slice(1, 4).map((article, index) => (
                    <Grid key={index} item xs={12} sm={index === 0 ? 12 : 6} md={index === 0 ? 12 : 6}>
                      <ArticleBox
                        article={article}
                        index={index + 1}
                        onClick={() => window.open(`/articles/${article.article_id}`, "_blank")}
                        height={225}
                        variant="body2"
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </FeatureArticleContainer>
  );
};

export default FeaturedArticles;