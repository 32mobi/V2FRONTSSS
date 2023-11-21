"use client"
import React from "react";
import { Box } from "@mui/material";
import useSWR from "swr";
import Banner from "@/components/home/Banner";
import Videos from "@/components/video/Videos";
import Loading from "../loading";

const apiUrl = `https://three2mobiles.onrender.com/api/youtube-videos/`;
const cdnApiUrl = `https://three2mobiles.onrender.com/api/statics/retrieve/1/`;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Video() {
  const { data: videoPosted, error } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 3600,
  });

  const { data: cdnData } = useSWR(cdnApiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 3600,
  });

  const articles_cdn_links = cdnData ? cdnData.articles_cdn_links : [];
  const articles_redirect_links = cdnData
    ? cdnData.articles_redirect_links
    : [];

  if (error) {
    console.error("Error fetching articles:", error);
  }

  if (!videoPosted || !cdnData) {
    return <Loading />;
  }

  return (
    <>
      <Box>
        <Box>
          <Banner
            backgroundImages={articles_cdn_links}
            redirect={articles_redirect_links}
          />
          <Videos videoPosted={videoPosted} />
        </Box>
      </Box>
    </>
  );
}

