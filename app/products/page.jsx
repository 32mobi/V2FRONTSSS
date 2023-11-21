"use client";
import React from "react";
import { Box } from "@mui/material";
import useSWR from "swr";
import Banner from "@/components/home/Banner";
import FeaturedBrands from "@/components/home/FeaturedBrands";
import ProductPage from "@/components/products/ProductPage";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Products() {
  const apiUrl = "https://three2mobiles.onrender.com/api/modeldetails/";
  const cdnApiUrl =
    "https://three2mobiles.onrender.com/api/statics/retrieve/1/";

  const { data: productDetails } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 3600,
  });

  const { data: cdnData } = useSWR(cdnApiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 3600,
  });

  const products_cdn_links = cdnData ? cdnData.products_cdn_links : [];
  const products_redirect_links = cdnData
    ? cdnData.products_redirect_links
    : [];

  return (
    <Box>
      <Box className="bannerlanding">
        <Banner
          backgroundImages={products_cdn_links}
          redirect={products_redirect_links}
        />
        <FeaturedBrands />
        {productDetails && <ProductPage productDetails={productDetails} />}
      </Box>
    </Box>
  );
}
