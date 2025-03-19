import React, { useState } from "react"; 
import { Box, Button, Card, Stack, TextField, Typography, useTheme } from "@mui/material";
import { isLoggedIn } from "../helpers/authHelper";
import { MdFeedback } from "react-icons/md";
import Navbar from "../components/Navbar"; // Import your Navbar component

const SuggestionsPage = () => {
  const theme = useTheme();
  const user = isLoggedIn(); // Check if the user is logged in
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the mailto link with the suggestion, name, and email
    const mailtoLink = `mailto:support@example.com?subject=Suggestion from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSuggestion: ${suggestion}`)}`;

    // Open the user's email client
    window.location.href = mailtoLink;

    // Clear the input fields
    setName("");
    setEmail("");
    setSuggestion("");
  };

  return (
    <Box sx={{ padding: "30px",  }}>
      <Navbar /> {/* Include the Navbar here */}
      <Card
        sx={{
          padding: "20px",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
            Suggestions Page
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MdFeedback size={30} color={theme.palette.primary.main} />
            <Typography variant="body1">
              We value your feedback! Please share your suggestions or improvements for our platform.
            </Typography>
          </Stack>
        </Stack>
        
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              backgroundColor: "#adbda",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
            required
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Your Suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            sx={{
              backgroundColor: "#adbda",
              borderRadius: "5px",
            }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "10px", borderRadius: "5px" }}
          >
            Submit
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default SuggestionsPage;
