import React from "react";
import Blogs from "@/components/articles/Blogs";
import Banner from "@/components/home/Banner";

export const metadata = {
  title: "Articles",
  description: "This is the Articles page",
  icons: {
    icon: "/images/favicon.ico",
  },
};

const Articles = () => {
  return (
    <>
      <Banner />
      <Blogs />
    </>
  );
};

export default Articles;
