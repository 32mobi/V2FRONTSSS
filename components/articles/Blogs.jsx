"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  InputBase,
  Pagination,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useRouter } from "next/navigation";

import SearchIcon from "@mui/icons-material/Search";
import getArticles from "@/app/libs/getArticles";

const BlogsBox = styled(Box)(({ theme }) => ({
  "& .blogContainer": {
    "& .btnContainer": {
      flexWrap: "wrap",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "flex-start",
      },
    },
    "& .btnBox": {
      padding: "5px 10px",
      borderRadius: "20px",
      margin: "5px",
    },
    "& .blogElement": {
      width: "100%",
      minHeight: "230px",
      background: "#e0e0e0",
      padding: "0 0 10px 0",
      cursor: "pointer",
      transition: "transform 1s",
      overflow: "hidden",
      "&:hover": {
        boxShadow: "rgba(100, 100, 111, 0.2) 0 7px 29px 0",
      },
      "& img": {
        height: "100%",
        objectFit: "contain",
        width: "100%",
        transition: "transform 1.5s",
        "&:hover": {
          transform: "scale(1.1)",
        },
      },
      "& h4": {
        fontSize: "16px",
        lineHeight: "1.2",
      },
      "& p": {
        whiteSpace: "pre",
        color: "#007acc",
      },
    },
  },
}));

const CategoryBtnsArr = [
  { label: "Latest News", color: "#fc8b01" },
  { label: "Best Mobiles", color: "#fd3101" },
  { label: "Upcoming Mobiles", color: "#0c6efc" },
  { label: "Performance", color: "#8a06fc" },
  { label: "Apple vs Samsung", color: "#fdac02" },
  { label: "Best Deals", color: "#0c6efc", href: "/" },
  { label: "Offers", color: "#fdac02" },
];

export default function Blogs() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [articleArr, setArticleArr] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;
  const articlesPerPage = 9;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoadingArticles(true);
        const articles = await getArticles();
        setArticleArr(articles);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingArticles(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    const filtered = articleArr.filter((blog) => {
      const query = searchQuery.toLowerCase();
      const title = blog.title.toLowerCase();
      return title.includes(query);
    });

    setFilteredArticles(filtered);
    setTotalPages(Math.ceil(filtered.length / articlesPerPage));
  }, [searchQuery, articleArr]);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + (page === 1 ? pageSize : articlesPerPage);

  const articlesFound = filteredArticles.length > 0;
  return (
    <BlogsBox>
      <Box className="blogContainer">
        <Container maxWidth="lg">
          <Box className="displaySpacebetween btnContainer" mb={3}>
            {CategoryBtnsArr.map((category, index) => (
              <Box
                key={index}
                className="displayAlign btnBox"
                sx={{ background: category.color }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", whiteSpace: "pre" }}
                >
                  {category.label}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box align="right">
            <Box
              ml={1}
              style={{
                background: "#e8e8e8",
                padding: "7px 10px 7px 20px",
                borderRadius: "25px",
                maxWidth: "240px",
              }}
            >
              <InputBase
                placeholder="Search your device"
                startAdornment={<SearchIcon sx={{ color: "#51087e" }} />}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Box>
          </Box>

          <Box className="blogContainerBox" mb={3}>
            {isLoadingArticles ? (
              <Box style={{ minHeight: "32vh" }}>
                <Typography variant="h6">Articles loading...</Typography>
              </Box>
            ) : articlesFound ? (
              <Grid container spacing={2}>
                {filteredArticles
                  .slice(startIndex, endIndex)
                  .map((blog, index) => (
                    <Grid
                      item
                      key={index}
                      xs={12}
                      sm={6}
                      md={index < 2 && page === 1 ? 6 : 4}
                    >
                      <Box
                        className="blogElement"
                        onClick={() =>
                          router.push(`/articles/${blog.article_id}`)
                        }
                      >
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          loading="lazy"
                          style={{
                            height: page === 1 && index < 2 ? "300px" : "200px",
                            marginTop: page === 1 && index < 2 ? "0" : "10px",
                          }}
                        />

                        <Box className="displaySpacebetween blogFooter">
                          <Box ml={2}>
                            <Typography variant="h4">
                              {blog.title.length > 20
                                ? blog.title.slice(0, 20) + "..."
                                : blog.title}
                            </Typography>
                          </Box>
                          <Box mr={2}>
                            <Typography variant="body1">
                              {blog.publication_date}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <Box style={{ minHeight: "32vh" }}>
                <Typography variant="h6" color="error">
                  No articles found.
                </Typography>
              </Box>
            )}
          </Box>
          <Box className="displayCenter" my={3}>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </Box>
        </Container>
      </Box>
    </BlogsBox>
  );
}
