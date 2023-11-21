

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import getIndividualArticle from "@/app/libs/getIndividualArticle";


const BlogSection = ({ title, content, imageUrl }) => (
  <div>
    {title && <Typography variant="h2">{title}</Typography>}
    <Typography variant="body2" dangerouslySetInnerHTML={{ __html: content }} />
    {imageUrl && <img src={imageUrl} alt={title} />}
  </div>
);

export default async function BlogLayout({params: {id}}){


  const individualArticle = getIndividualArticle(id)
  const articleArr = await individualArticle
  console.log(articleArr, "jjj")
  const { title, sub_title1, sub_title3, content2, content3, sub_title4, content4 } = articleArr;
  const contentParts = articleArr.content ? articleArr.content.split("{{") : [];
  const page_desc = contentParts[1] ? contentParts[1].split("}}")[0] : "";
  const content1 = contentParts[1] ? contentParts[1].split("}}")[1] : articleArr.content;

  const contentParts4 = articleArr.content4 ? articleArr.content4.split("{{") : [];
  const conclusion = contentParts4[1] ? contentParts4[1].split("}}")[1] : "";

  return (
    <div>
      <Container maxWidth="lg">
        <Box className="articleClass">
          <Typography variant="h1">{title}</Typography>
          <BlogSection title={sub_title1} content={page_desc} imageUrl={articleArr.image_url} />
          <BlogSection content={content1} />
          <BlogSection title={sub_title3} content={content2} imageUrl={articleArr.image_url1} />
          <BlogSection title={sub_title3} content={content3} imageUrl={articleArr.image_url2} />
          <BlogSection title={sub_title4} content={content4} imageUrl={articleArr.image_url3} />
          <BlogSection content={conclusion} />
        </Box>
      </Container>
    </div>
  );
};
