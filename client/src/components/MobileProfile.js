import { useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const MobileProfile = ({
  profile,
  handleEditing,
  editing,
  handleMessage,
  handleSubmit,
  validate,
}) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (profile) {
      setUser(profile.user);
    }
  }, [profile]);

  return (
    <Card sx={{ width: "100%", maxWidth: "95%", mx: "auto", mb: 2 }}>
      {user ? (
        <Stack spacing={2} sx={{ px: 2, py: 3 }}>
          <HorizontalStack spacing={2} justifyContent="space-between">
            <HorizontalStack>
              <UserAvatar width={50} height={50} username={user.username} />
              <Typography variant="h6" textOverflow="ellipsis">
                {user.username}
              </Typography>
            </HorizontalStack>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <HorizontalStack spacing={3}>
                <Stack alignItems="center">
                  <Typography>Likes</Typography>
                  <Typography color="text.secondary">
                    <b>{profile.posts.likeCount}</b>
                  </Typography>
                </Stack>
                <Stack alignItems="center">
                  <Typography color="text.secondary">Posts</Typography>
                  <Typography color="text.secondary">
                    <b>{profile.posts.count}</b>
                  </Typography>
                </Stack>
              </HorizontalStack>
            </Box>
          </HorizontalStack>
          <Divider />
          <Box>
            {currentUser && user._id === currentUser.userId && (
              <IconButton onClick={handleEditing} sx={{ mr: 1 }}>
                {editing ? (
                  <MdCancel color={iconColor} />
                ) : (
                  <AiFillEdit color={iconColor} />
                )}
              </IconButton>
            )}
            {user.biography ? (
              <Typography
                textAlign="center"
                variant="body1" // Increased font size
                sx={{
                  fontSize: "1.1rem",
                  color: theme.palette.primary.main,
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                  p: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.background.default,
                }}
              >
                <b>Bio:</b> {user.biography}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ textAlign: "center", p: 2 }}>
                <i>
                  No bio yet{" "}
                  {currentUser && user._id === currentUser.userId && (
                    <span>- Tap on the edit icon to add your bio</span>
                  )}
                </i>
              </Typography>
            )}
            {currentUser && user._id !== currentUser.userId && (
              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" onClick={handleMessage}>
                  Message
                </Button>
              </Box>
            )}
            {editing && (
              <Box>
                <ContentUpdateEditor
                  handleSubmit={handleSubmit}
                  originalContent={user.biography}
                  validate={validate}
                />
              </Box>
            )}
          </Box>
        </Stack>
      ) : (
        <>Loading...</>
      )}
    </Card>
  );
};

export default MobileProfile;
