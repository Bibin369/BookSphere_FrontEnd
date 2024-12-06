import React from 'react';
import { AppBar, Toolbar, Typography, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Main content area */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Main content goes here */}
      </Box>

      {/* Footer */}
      <AppBar position="relative" sx={{ backgroundColor: 'white', color: 'black', padding: 2 }}>
        <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Main Footer Content */}
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'black' }}>
            © {new Date().getFullYear()} Bibin Thomas. All rights reserved.
          </Typography>

          {/* Divider for visual separation */}
          <Divider sx={{ width: '100%', my: 2, backgroundColor: 'black' }} />

          {/* Footer Links */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Link to="/about" style={{ textDecoration: 'none', color: 'black' }}>
              <Typography variant="body2">About</Typography>
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'black' }}>
              <Typography variant="body2">Contact</Typography>
            </Link>
            <Link to="/privacy" style={{ textDecoration: 'none', color: 'black' }}>
              <Typography variant="body2">Privacy Policy</Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
