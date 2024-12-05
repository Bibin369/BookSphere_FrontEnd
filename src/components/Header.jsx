import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo aligned to the left */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            📚 Book Store
          </Link>
        </Typography>

        {/* Menu items aligned to the right */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "white",
              fontWeight: "bold",
              margin: "0 10px",
              textTransform: "capitalize",
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/add"
            sx={{
              color: "white",
              fontWeight: "bold",
              margin: "0 10px",
              textTransform: "capitalize",
            }}
          >
            Add Books
          </Button>
          <Button
            component={Link}
            to="/viewAll"
            sx={{
              color: "white",
              fontWeight: "bold",
              margin: "0 10px",
              textTransform: "capitalize",
            }}
          >
            View Books
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
