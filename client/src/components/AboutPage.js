import React from 'react';
import { Box, Typography, Card, Stack, Button, Grid, IconButton, Divider } from '@mui/material';
import Navbar from "../components/Navbar";
import UserAvatar from "../components/UserAvatar"; // Importing here the RoboHash UserAvatar fr
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "FarhaanAli Vohra",
      bio: "A passionate developer who loves coding and learning new technologies.",
      profileLink: "/users/FarhaanAliV",
      username: "FarhaanAliV",
      instagram: "https://instagram.com/f.ali_27",
      linkedin: "https://www.linkedin.com/in/farhaanali-vohra-315b76275/",
    },
    {
      name: "Divya Trivedi",
      bio: "A dedicated student focused on enhancing the educational experience for everyone.",
      profileLink: "/users/DivyaTrivedi",
      username: "divya-trivedi",
      instagram: "https://instagram.com/divya_trivedi1235",
      linkedin: "https://www.linkedin.com/in/divya-s-trivedi-563138300/",
    },
    {
      name: "Keyur Vaghani",
      bio: "An aspiring software engineer with a keen interest in web development and design.",
      profileLink: "/users/keyur-vaghani",
      username: "keyur-vaghani",
      instagram: "https://instagram.com/keyur_vaghani",
      linkedin: "https://linkedin.com/in/keyur-vaghani",
    },
  ];

  return (
    <Box sx={{ padding: "30px", backgroundColor: "#f4f6f8" }}>
      <Navbar />
      <Card
        sx={{
          padding: "30px",
          backgroundColor: 'white',
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
          About Us
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Welcome to our platform! We are dedicated to helping students find answers to their doubts and enhance their learning experience.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
          Meet our Team :
        </Typography>

        <Grid container spacing={3}>
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={4} key={member.name}>
              <Card sx={{ padding: 2, textAlign: 'center', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                  <UserAvatar username={member.username} height={50} width={50} />
                  <Typography 
                    variant="h6" 
                    sx={{ marginTop: 1, cursor: 'pointer', color: '#3d52a0' }} 
                    component="a" 
                    href={member.profileLink} 
                    onClick={(e) => { e.preventDefault(); window.location.href = member.profileLink; }} // Navigate to profile
                  >
                    {member.name}
                  </Typography>
                </Stack>

                {/* Divider to separate the avatar and name from the rest */}
                <Divider sx={{ marginY: 2, bgcolor: '#3d52a0', height: 2 }} />

                <Typography variant="body2" sx={{ marginBottom: 1 }}>{member.bio}</Typography>
                
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ marginBottom: 1 }}>
                  <IconButton component="a" href={member.instagram} target="_blank" color="primary">
                    <FaInstagram />
                  </IconButton>
                  <IconButton component="a" href={member.linkedin} target="_blank" color="primary">
                    <FaLinkedin />
                  </IconButton>
                </Stack>

                <Button 
                  component="a" 
                  href={member.profileLink} 
                  variant="outlined" 
                  size="small" 
                  sx={{
                    borderColor: '#3d52a0',
                    color: '#3d52a0',
                    '&:hover': {
                      backgroundColor: '#3d52a0',
                      color: 'white',
                    },
                  }}
                >
                  View Profile
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="body2" sx={{ marginTop: '20px', textAlign: 'center' }}>
          We value your feedback and suggestions. Feel free to reach out to us anytime!
        </Typography>
      </Card>
    </Box>
  );
};

export default AboutPage;
