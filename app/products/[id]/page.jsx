import { Box } from "@mui/material";
import ProductDetail from "@/components/products/product-details";
export default function ProductDetailPage({
  product,
  relatedArticles,
  relatedVideos,
}) {
  return (
    <>
      <Box>
        <ProductDetail
          product={product}
          relatedArticles={relatedArticles}
          relatedVideos={relatedVideos}
        />
      </Box>
    </>
  );
}
