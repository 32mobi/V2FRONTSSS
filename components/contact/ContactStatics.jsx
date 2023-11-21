import { Box, Typography } from "@mui/material";
import React from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Link from "next/link";

export default function ContactStatics() {
  return (
    <>
      <Box mb={2}>
        <Typography variant="h4" mb={1}>Get in touch with us</Typography>

        <Typography variant="subtitle2">
          Caring Support: Reach out to our team for questions, assistance, or
          feedback. We're here to help!
        </Typography>
      </Box>

      <Box>
        <Box className="displayAlign" mt={1}>
          <Box mr={2}>
            <EmailOutlinedIcon className="staticIcons" />
          </Box>
          <Box>
            <Typography variant="subtitle1">Email</Typography>
            <Typography variant="body1">
              <Link href="mailto:contact@32mobiles.com">contact@32mobiles.com</Link>
            </Typography>
          </Box>
        </Box>
        <Box className="displayAlign" mt={1}>
          <Box mr={2}>
            <PhoneOutlinedIcon className="staticIcons" />
          </Box>
          <Box>
            <Typography variant="subtitle1">Mobile No.</Typography>
            <Typography variant="body1">
              <Link href="tel:+917290948417">+91-729 0948 417</Link>
            </Typography>
          </Box>
        </Box>
        <Box className="displayAlign" mt={1}>
          <Box mr={2}>
            <LocationOnOutlinedIcon className="staticIcons" />
          </Box>
          <Box>
            <Typography variant="subtitle1">Location</Typography>
            <Typography variant="body1" sx={{ color: "#676767" }}>
              ILD Trade Centre, D1 Block, Sector 47, Gurugram, Haryana 122018
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box my={2} className="mapBox">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.8121695561713!2d77.03638927468698!3d28.424923975778746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1875d7aa50e5%3A0x7e6930bbea28775f!2sILD%20Trade%20Centre!5e0!3m2!1sen!2sin!4v1699085579380!5m2!1sen!2sin"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </>
  );
}
