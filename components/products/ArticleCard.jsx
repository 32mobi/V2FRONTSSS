import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ArticleCard = ({ article }) => {
  const { title, image_url } = article;

  const cardStyle = {
    margin: "0px 16px 16px 0px",
    cursor: "pointer",
    maxWidth: "218px",
    width: "100%",
    height: "300px",
    "@media(maxWidth:768px)": {
      maxWidth: "300px",
    },
  };
  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
  };
  const sanitizeTitleForURL = (title) => {
    const sanitizedTitle = title
      .trim()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    return sanitizedTitle;
  };
  return (
    <Card style={cardStyle}>
      <CardContent
        onClick={() =>
          window.open(
            `/articles/${sanitizeTitleForURL(article.title)}/${
              article.article_id
            }`,
            "_blank"
          )
        }
      >
        <Typography variant="body2" sx={{ color: "#000", lineHeight: "20px" }}>
          {title}
        </Typography>
        <img src={image_url} alt={title} style={imageStyle} />
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
