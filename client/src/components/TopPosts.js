import { Box, Card, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import Loading from "./Loading";
import PostCard from "./PostCard";
import HorizontalStack from "./util/HorizontalStack";
import { MdLeaderboard } from "react-icons/md";

const TopPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const user = isLoggedIn();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchPosts = async () => {
    const query = { sortBy: "-likeCount" };
    const data = await getPosts(user && user.token, query);
    const topPosts = data?.data?.slice(0, 3) || [];
    setPosts(topPosts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Stack
      spacing={3}
      sx={{
        padding: isSmallScreen ? "15px" : "30px",  // Adjust padding for small screens
        maxWidth: "100%", // Limit width for smaller screens
      }}
    >
      <Card
        sx={{
          padding: "10px",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <HorizontalStack spacing={1}>
          <MdLeaderboard style={{ fontSize: "24px", color: theme.palette.primary.main }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.primary,
              fontSize: isSmallScreen ? "1rem" : "1.25rem", // Adjust font size
            }}
          >
            Top Posts
          </Typography>
        </HorizontalStack>
      </Card>

      {!loading ? (
        posts?.length > 0 ? (
          posts.map((post) => (
            <PostCard
              preview="secondary"
              post={post}
              key={post._id}
              hideLikeBox
              sx={{
                p: isSmallScreen ? 2 : 3,
                borderRadius: "10px",
                boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.1s ease-in-out",
                width: "100%",
              }}
            />
          ))
        ) : (
          <Typography>No top posts found</Typography>
        )
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default TopPosts;
