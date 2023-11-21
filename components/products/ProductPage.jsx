"use client"
import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  styled,
  Stack,
  Pagination,
  InputBase,
  MenuItem,
  Select,
  TextField,
  Slider,
  Hidden,
} from "@mui/material";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

const ProductContainer = styled("div")(({ theme }) => ({
  "& .productlanding": {
    "& .productCard": {
      width: "100%",
      height: "250px",
      backgroundColor: "#ffffffb6",
      borderRadius: "5px",
      padding: "10px 0px 30px 0px",
      cursor: "pointer",
      "& .productImg": {
        height: "85%",
        "& img": {
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "5px",
          transition: "1s",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
      },
      "& .productDetails": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textTransform: "capitalize",
        margin: "15px 0px",
        "& h5": {
          fontSize: "16px",
          marginLeft: "10px",
          [theme.breakpoints.down("sm")]: {
            fontSize: "12px !important",
          },
        },
        "& h6": {
          fontSize: "12px",
          background: "#7a69fe83",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "20px",
          marginRight: "10px",
          [theme.breakpoints.down("sm")]: {
            padding: "5px 7px",
            fontSize: "10px !important",
          },
        },
      },
    },
    "& .MuiGrid-item": {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "0px !important",
      },
    },
  },
}));
const FilterBox = styled("div")(({ theme }) => ({
  "& .filterContainer": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    padding: "24px 0px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0px",
      padding: "24px 0px 0px !important",
    },
    "& .filterOptBox": {
      maxWidth: "100px",
      "& .css-tnue1l-MuiInputBase-root-MuiOutlinedInput-root": {
        borderRadius: "25px !important",
      },
      "& input": { width: "100%" },
      [theme.breakpoints.down("sm")]: { margin: "10px 0px" },
    },
    "& .filterMenuBox": {
      "& .filterSelectBox": {
        textTransform: "capitalize",
        background: "#0284d3 !important",
        borderRadius: "25px !important",
        margin: "0px 10px 0px 0px !important",
      },
    },
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
    "& .MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
      maxHeight: "245px !important",
      overflowY: "scroll !important",
    },
  },
}));

export default function ProductPage({ productDetails }) {
  const router = useRouter();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("mobile");
  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 12;

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value.toLowerCase();
    setCategory(selectedCategory);
    setPage(1);

    const query = router.query;
    query.page = 1;
    query.category = selectedCategory;
    router.push({ pathname: router.pathname, query });
  };

  const uniqueCategory = [
    ...new Set(
      productDetails.map((product) => product.categoryname.toLowerCase())
    ),
  ];

  const filteredProductsByCategory = productDetails.filter(
    (product) => product.categoryname === category
  );

  const uniqueBrands = [
    ...new Set(
      productDetails.map((product) => product.brandname.toLowerCase())
    ),
  ];
  const brandsWithAll = ["all", ...uniqueBrands];

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value.toLowerCase();
    setSelectedBrand(selectedBrand);
    setPage(1);

    const query = { ...router.query };
    query.page = 1;
    query.brand = selectedBrand;
    router.push({ pathname: router.pathname, query });
  };

  const filteredBrands =
    selectedBrand === "all"
      ? filteredProductsByCategory
      : filteredProductsByCategory.filter(
          (product) => product.brandname === selectedBrand
        );

  const filteredProducts = filteredBrands
    .filter((product) => {
      const brandNameMatches = product.brandname
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const modelNameMatches = product.model_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return brandNameMatches || modelNameMatches;
    })
    .filter((product) => {
      const productPrice = parseFloat(product.price);
      const minPriceValue = parseFloat(minPrice);
      const maxPriceValue = parseFloat(maxPrice);

      if (!isNaN(minPriceValue) && !isNaN(maxPriceValue)) {
        return productPrice >= minPriceValue && productPrice <= maxPriceValue;
      } else if (!isNaN(minPriceValue)) {
        return productPrice >= minPriceValue;
      } else if (!isNaN(maxPriceValue)) {
        return productPrice <= maxPriceValue;
      } else {
        return true;
      }
    });

  const handlePageChange = useCallback(
    (event, value) => {
      if (
        value >= 1 &&
        value <= Math.ceil(filteredProducts.length / pageSize)
      ) {
        const query = { ...router.query };
        query.page = value;
        query.category = category;
        query.brand = selectedBrand;
        query.minPrice = minPrice;
        query.maxPrice = maxPrice;
        query.search = searchQuery;
        router.push({ pathname: router.pathname, query });

        setPage(value);
      }
    },
    [
      router,
      pageSize,
      filteredProducts,
      category,
      selectedBrand,
      minPrice,
      maxPrice,
      searchQuery,
    ]
  );

  useEffect(() => {
    const query = { ...router.query };
    const categoryQueryParam = query.category;
    const brandQueryParam = query.brand;
    const minPriceQueryParam = query.minPrice;
    const maxPriceQueryParam = query.maxPrice;
    const searchQueryParam = query.search;

    if (categoryQueryParam) {
      setCategory(categoryQueryParam);
    }
    if (brandQueryParam) {
      setSelectedBrand(brandQueryParam);
    }
    if (minPriceQueryParam) {
      setMinPrice(minPriceQueryParam);
    }
    if (maxPriceQueryParam) {
      setMaxPrice(maxPriceQueryParam);
    }
    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }

    if (query.page && !isNaN(query.page)) {
      const pageNumber = Number(query.page);
      if (
        pageNumber >= 1 &&
        pageNumber <= Math.ceil(filteredProducts.length / pageSize)
      ) {
        setPage(pageNumber);
      } else {
        setPage(1);
      }
    } else {
      setPage(1);
    }
  }, [router, pageSize, filteredProducts]);

  const getDisplayedProducts = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleMaxPriceChange = (e) => {
    const inputValue = e.target.value;
    const inputLength = inputValue.length;

    if (inputLength <= 6) {
      setMaxPrice(inputValue);
    }
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
    <ProductContainer>
      <Box className="productlanding">
        <Container maxWidth="lg">
          <FilterBox>
            <Box className="filterContainer">
              <Box className="filterMenuBox">
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  autoWidth={true}
                  label="Category"
                  className="filterSelectBox"
                >
                  {uniqueCategory.slice(0, 6).map((categoryname) => (
                    <MenuItem key={categoryname} value={categoryname}>
                      {categoryname}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box className="filterMenuBox">
                <Select
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  autoWidth={true}
                  label="Brand"
                  className="filterSelectBox"
                >
                  {brandsWithAll.map((brandName) => (
                    <MenuItem key={brandName} value={brandName}>
                      {brandName}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Hidden smDown>
                <Box className="filterOptBox">
                  <TextField
                    type="number"
                    label="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    InputProps={{
                      inputProps: { min: 0 },
                      autoComplete: "off",
                    }}
                  />
                </Box>
              </Hidden>

              <Box className="filterMenuBox displayCenter">
                <Box mr={2}>
                  <Typography id="price-range-slider" gutterBottom>
                    Price Range
                  </Typography>
                </Box>
                <Box sx={{ minWidth: "150px" }}>
                  <Slider
                    value={[
                      minPrice === "" ? 5000 : parseFloat(minPrice),
                      maxPrice === "" ? 200000 : parseFloat(maxPrice),
                    ]}
                    onChange={(e, newValue) => {
                      setMinPrice(newValue[0]);
                      setMaxPrice(newValue[1]);
                    }}
                    min={5000}
                    step={50}
                    max={200000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `₹${value}`}
                    aria-labelledby="price-range-slider"
                  />
                </Box>
              </Box>
              <Hidden smDown>
                <Box className="filterOptBox">
                  <TextField
                    type="number"
                    label="Max Price"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    InputProps={{
                      inputProps: { min: 0 },
                      autoComplete: "off",
                    }}
                  />
                </Box>
              </Hidden>

              <Box
                style={{
                  background: "#e8e8e8",
                  padding: "7px 10px 7px 20px",
                  borderRadius: "25px",
                }}
              >
                <InputBase
                  placeholder="Search your device"
                  startAdornment={<SearchIcon sx={{ color: "#51087e" }} />}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Box>
            </Box>
          </FilterBox>
          {filteredProducts.length === 0 ? (
            <Typography variant="h6" color="error">
              No products found.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {getDisplayedProducts().map((product) => (
                <Grid item xs={6} sm={6} md={4} key={product.model_id}>
                  <Box
                    className="productCard"
                    onClick={() =>
                      router.push({
                        pathname: `/products/${sanitizeTitleForURL(
                          `${product.brandname} ${product.model_name}`
                        )}/${product.model_id}`,
                      })
                    }
                  >
                    <Box className="productImg">
                      <img
                        src={product.img1}
                        alt={product.model_name}
                        loading="lazy"
                      />
                    </Box>
                    <Box className="productDetails">
                      <Box>
                        <Typography variant="h5">
                          {product.brandname}
                          <br />
                          {product.model_name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6">
                          <span> {product.brandname} </span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
        <Box className="displayCenter" mt={7} mb={3}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredProducts.length / pageSize)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      </Box>
    </ProductContainer>
  );
}
