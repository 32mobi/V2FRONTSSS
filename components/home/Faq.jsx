"use client"
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import { accordionData } from "@/data";

const AccordionContainer = styled("div")(({ theme }) => ({
  "& .sectionTitle": {
    "& h5": {
      color: "#000",
      fontWeight: "400",
      fontSize: "22px",
    },
  },
  "& h5": {
    color: "#000",
    fontWeight: "300",
    fontSize: "16px",
  },
  "& h6": {
    color: "#5e5e5e",
    fontSize: "16px",
  },
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  margin: "24px 0px",
  border: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Faq() {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : "");
  };

  return (
    <AccordionContainer>
      <Container maxWidth="lg">
        <Box my={2} className="sectionTitle">
          <Typography variant="h5">32Mobile Hot Searches</Typography>
        </Box>
        {accordionData.map((item) => (
          <Accordion
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleChange(item.id)}
          >
            <AccordionSummary aria-controls={`${item.id}-content`} id={`${item.id}-header`}>
              <Typography variant="h5">{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </AccordionContainer>
  );
}
