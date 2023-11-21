"use client";
import Banner from "@/components/home/Banner";
import Faq from "@/components/home/Faq";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import FeaturedBrands from "@/components/home/FeaturedBrands";
import LatestVideos from "@/components/home/LatestVideos";
import PriceRange from "@/components/home/PriceRange";
import Subscribe from "@/components/home/Subscribe";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const articlesApiUrl = "https://three2mobiles.onrender.com/api/articles/";
  const brandsApiUrl = "https://three2mobiles.onrender.com/api/brands/";
  const priceApiUrl = "https://three2mobiles.onrender.com/api/price-statics/";
  const cdnApiUrl =
    "https://three2mobiles.onrender.com/api/statics/retrieve/1/";

  const { data: articlesBlog } = useSWR(articlesApiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: brands } = useSWR(brandsApiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: price } = useSWR(priceApiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: cdnData } = useSWR(cdnApiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const homepage_cdn_links = cdnData ? cdnData.homepage_cdn_links : [];
  const homepage_redirect_links = cdnData
    ? cdnData.homepage_redirect_links
    : [];

  return (
    <main>
      <Banner backgroundImages={homepage_cdn_links} redirect={homepage_redirect_links} />
      <FeaturedBrands brands={brands} />
      <FeaturedArticles articlesBlog={articlesBlog} />
      <PriceRange price={price} />
      <Subscribe />
      <LatestVideos />
      <Faq />
    </main>
  );
}
