import { Box, Button, Typography, Modal } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { TfiLoop } from "react-icons/tfi";
import { isLoggedIn } from "../helpers/authHelper"; // Import isLoggedIn

// Custom modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.4)',
  p: 4,
  textAlign: "center",
  fontFamily: "Poppins, sans-serif",
  transition: "transform 0.3s ease, opacity 0.3s ease",
};

const WelcomeModal = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  // Check if the user is on login/signup page or already logged in
  if (location.pathname === "/signup" || location.pathname === "/login" || isLoggedIn()) {
    return null; // Do not render the modal in these cases
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        backdropFilter: 'blur(5px)',
        bgcolor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <Box sx={{ ...modalStyle, transform: "translate(-50%, -48%)" }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            color: "white",
            background: "linear-gradient(90deg, #3d52a0, #5c7fdb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-flex",
            alignItems: "center",
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          Welcome to PadhLoop!
          <TfiLoop size={30} color="#5c7fdb" style={{ marginLeft: '8px' }} />
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontSize: '1.3rem',
            color: "#6a82d2",
            letterSpacing: "0.5px",
            transition: "transform 0.3s ease",
          }}
        >
          A place where students help students!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 4,
            fontSize: '1.2rem',
            color: "#444",
            lineHeight: 1.8,
            fontStyle: "italic",
            px: 3,
            animation: 'fadeIn 0.8s ease-in-out',
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          Got a head-scratcher? Toss it in the ring, get the insights you need, or jump in to help a fellow student out.
          Dive in, learn up, and watch your knowledge grow! 🌱
        </Typography>

        {/* Get Started Button */}
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            bgcolor: "linear-gradient(90deg, #3d52a0, #5c7fdb)",
            color: "#fff",
            borderRadius: 30,
            padding: '12px 24px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textTransform: "none",
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            "&:hover": {
              bgcolor: "linear-gradient(90deg, #5c7fdb, #3d52a0)",
              transform: "scale(1.05)",
            },
            transition: "transform 0.2s ease-in-out",
            mr: 2, // Added right margin for spacing
          }}
        >
          Explore
        </Button>

        {/* Join Us Button */}
        <Button
          variant="contained"
          component="a"
          href="/signup"
          sx={{
            bgcolor: "linear-gradient(90deg, #3d52a0, #5c7fdb)",
            color: "#fff",
            borderRadius: 30,
            padding: '12px 24px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textTransform: "none",
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            "&:hover": {
              bgcolor: "linear-gradient(90deg, #5c7fdb, #3d52a0)",
              transform: "scale(1.05)",
            },
            transition: "transform 0.2s ease-in-out",
          }}
        >
          Join Us
        </Button>
      </Box>
    </Modal>
  );
};

export default WelcomeModal;
