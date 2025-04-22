"use client";

import { Box, Typography, Container, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
// import { useAppContext } from "@/context/AppContext"; // ✅ Update import path for Next.js

const Footer = () => {
  // const { mode } = useAppContext();

  const socialLinks = [
    { to: "https://www.facebook.com/", icon: <FacebookIcon />, bgColor: "#1877F2" },
    { to: "https://wa.me/", icon: <WhatsAppIcon />, bgColor: "#25D366" },
    { to: "https://twitter.com/", icon: <TwitterIcon />, bgColor: "#1DA1F2" },
    { to: "https://www.instagram.com/", icon: <InstagramIcon />, bgColor: "#E1306C" },
  ];

  return (
    <Box
      // sx={{
      //   backgroundColor: mode === "dark" ? "#121212" : "#ffffff",
      //   color: mode === "dark" ? "#ffffff" : "#000000",
      //   width: "100%",
      //   mt: 4,
      //   py: 3,
      //   borderTop: `1px solid ${mode === "dark" ? "#444" : "#ddd"}`,
      // }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Connect With Us
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          {socialLinks.map((link, index) => (
            <IconButton
              key={index}
              component="a"
              href={link.to}
              target="_blank"
              rel="noopener noreferrer"
              // sx={{
              //   backgroundColor: mode === "dark" ? link.bgColor : "#f0f0f0",
              //   color: mode === "dark" ? "white" : "#000000",
              //   "&:hover": {
              //     transform: "scale(1.1)",
              //     transition: "0.3s",
              //     backgroundColor: mode === "dark" ? link.bgColor : "#ddd",
              //   },
              // }}
            >
              {link.icon}
            </IconButton>
          ))}
        </Box>

        <Typography variant="body2">
          © {new Date().getFullYear()}{" "}
          <a
            href="#"
            // style={{
            //   textDecoration: "none",
            //   color: mode === "dark" ? "#90caf9" : "#1976d2",
            //   fontWeight: "bold",
            // }}
          >
            AzadDev 💕
          </a>{" "}
          - All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
