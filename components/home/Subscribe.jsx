import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  styled,
} from "@mui/material";

const SubscriptionContainer = styled("div")(({ theme }) => ({
  "& .subscribe-container": {
    padding: "24px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& h6": {
      fontWeight: "300",
    },
    "& .inputField": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    "& input": {
      minWidth: "275px !important",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        minWidth: "120px",
      },
    },
    "& button":{
      margin:"0 0 0 8px",
      [theme.breakpoints.down("sm")]: {
        margin:"8px 0 0 0"
      },
    }
  },
}));

const Subscribe = () => {
  return (
    <SubscriptionContainer>
      <Box className="subscribe-container" align="center">
        <Container maxWidth="lg">
          <Box my={2}>
            <Typography variant="h5">
              Be the first to know when the New Article Published
            </Typography>
          </Box>
          <Box my={2}>
            <Typography variant="h6">
              Subscribe to our newsletter, receive tech news and our latest
              updates.
            </Typography>
          </Box>
          <Box className="inputField">
            <Box>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                inputProps={{
                  style: {
                    fontSize: "16px", 
                    padding: "12px", 
                  },
                }}
              />
            </Box>
            <Box>
              <Button variant="contained" color="primary" size="large">
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </SubscriptionContainer>
  );
};

export default Subscribe;
