import React from "react";
import { Box, Typography, styled } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { priceArr } from "@/data";

const PriceCard = styled("div")(({ theme }) => ({
  "& .price-container": {
    "& .price-item": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      maxWidth: "250px",
      padding: "5px 15px",
      width: "100%",
      height: "150px",
      cursor: "pointer",
      borderRadius: "15px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "125px",
        height: "100px",
      },
      "&:hover": {
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      },
      "& h5": {
        color: "#fff",
        textAlign: "center",
        "& span": {
          fontWeight: "600",
        },
      },
    },
  },
}));

const PriceRangeCard = () => {
  return (
    <PriceCard>
      <Box className="price-container">
        {priceArr.map((priceRange) => (
          <Box
            key={priceRange.id}
            className="price-item"
            sx={{ background: priceRange.color }}
          >
            <Box className="smartphn">
              <SmartphoneIcon
                sx={{ color: "#b8daed", height: "70px", width: "70px" }}
              />
            </Box>
            <Typography variant="h5">
              Best Phones Under <span>{priceRange.price}</span>
            </Typography>
          </Box>
        ))}
      </Box>
    </PriceCard>
  );
};

export default PriceRangeCard;
