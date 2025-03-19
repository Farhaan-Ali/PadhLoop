import { Avatar, IconButton, Stack, TextField, Typography, Button, InputAdornment } from "@mui/material"; 
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiFillFileText, AiFillHome, AiOutlineSearch, AiOutlineInfoCircle } from "react-icons/ai";
import { TfiLoop } from "react-icons/tfi";
import { RiLightbulbLine } from "react-icons/ri";  // New suggestion icon
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => setWindowWidth(window.innerWidth);
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => setSearch(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const mobile = width < 500;
  const navbarWidth = width < 600;

  return (
    <Stack mb={2} sx={{ p: 2, position: 'relative', top: 0, zIndex: 1000, boxShadow: '0 0 0 rgba(0, 0, 0, 0.2)' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: 2,
          minHeight: '70px',
          background: 'linear-gradient(90deg, #3d52a0, #5c7fdb)',
          borderRadius: 2,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* PadhLoop Logo and Text */}
        <HorizontalStack>
          <TfiLoop size={33} color="#ede8f5" onClick={() => navigate("/")} />
          <Link to="/" style={{ textDecoration: 'none', marginRight: "20px" }}>
            <Typography
              sx={{
                display: mobile ? "none" : "block",
                color: "#ede8f5",
                fontFamily: "Poppins, sans-serif",
                '&:hover': {
                  color: '#5c7fdb',
                  borderRadius: 1,
                  transform: "scale(1.02)",
                },
              }}
              variant={navbarWidth ? "h6" : "h4"}
            >
              PadhLoop
            </Typography>
          </Link>
        </HorizontalStack>

        {/* Centered Search Bar */}
        {!navbarWidth && (
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ flexGrow: 1, mx: 3 }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ width: "80%", maxWidth: 500 }}>
              <TextField
                size="small"
                placeholder="Search Doubts..."
                variant="outlined"
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  borderRadius: 20,
                  bgcolor: "background.paper",
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 20,
                    paddingRight: "10px",
                    '& fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: '#5c7fdb' },
                    '&.Mui-focused fieldset': { borderColor: '#5c7fdb' },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiOutlineSearch color="#5c7fdb" />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                value={search}
              />
            </Box>
          </Stack>
        )}

        {/* Icons and Buttons */}
        <HorizontalStack>
          {mobile && (
            <IconButton onClick={() => setSearchIcon(!searchIcon)}>
              <AiOutlineSearch color="#ede8f5" />
            </IconButton>
          )}
          <IconButton component={Link} to="/">
            <AiFillHome color="#ede8f5" />
          </IconButton>
          <IconButton component={Link} to="/suggestions">
            <RiLightbulbLine color="#ede8f5" />
          </IconButton>
          <IconButton component={Link} to="/about">
            <AiOutlineInfoCircle color="#ede8f5" />
          </IconButton>
          {user ? (
            <>
              <IconButton component={Link} to={"/users/" + username}>
                <UserAvatar width={40} height={40} username={username} />
              </IconButton>
              <Button
                onClick={handleLogout}
                sx={{
                  color: "#ede8f5",
                  minWidth: 100,
                  padding: "10px 20px",
                  border: "2px solid #ede8f5",
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#5c7fdb',
                    borderRadius: 1,
                    transform: "scale(1.02)",
                  },
                }}
              >
                LogOut
              </Button>
            </>
          ) : (
            <>
              <Button 
                href="/signup" 
                sx={{ 
                  color: "#ede8f5", 
                  minWidth: 100, 
                  padding: "10px 20px", 
                  border: "2px solid #ede8f5", 
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#5c7fdb',
                    borderRadius: 1,
                    transform: "scale(1.02)",
                  },
                }}
              >
                Sign Up
              </Button>
              <Button 
                href="/login" 
                sx={{ 
                  color: "#ede8f5", 
                  minWidth: 100, 
                  padding: "10px 20px", 
                  border: "2px solid #ede8f5", 
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#5c7fdb',
                    borderRadius: 1,
                    transform: "scale(1.02)",
                  },
                }}
              >
                Login
              </Button>
            </>
          )}
        </HorizontalStack>
      </Stack>

      {navbarWidth && searchIcon && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            size="large"
            label="Search for posts..."
            fullWidth
            onChange={handleChange}
            value={search}
            sx={{
              backgroundColor: "#adbbda",
              borderRadius: 8,
              '& .MuiOutlinedInput-root': {
                borderRadius: 8,
                '& fieldset': {
                  borderColor: '#adbbda',
                },
                '&:hover fieldset': {
                  borderColor: '#5c7fdb',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5c7fdb',
                },
              },
            }}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Navbar;
