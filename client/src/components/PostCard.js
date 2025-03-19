import {
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AiFillCheckCircle, AiFillEdit, AiFillMessage, AiFillLike } from "react-icons/ai"; // AiFillLike for displaying like icon
import { useNavigate } from "react-router-dom";
import { deletePost, likePost, unlikePost, updatePost } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import ContentDetails from "./ContentDetails";
import LikeBox from "./LikeBox";
import PostContentBox from "./PostContentBox";
import HorizontalStack from "./util/HorizontalStack";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";
import "./postCard.css";
import { MdCancel } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
import UserLikePreview from "./UserLikePreview";  // Importing UserLikePreview for regular posts

const PostCard = (props) => {
  const { preview, removePost, hideLikeBox } = props; // Added hideLikeBox prop for conditional like box
  let postData = props.post;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const isAuthor = user && user.username === postData.poster.username;

  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [post, setPost] = useState(postData);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleDeletePost = async (e) => {
    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {
      setLoading(true);
      await deletePost(post._id, isLoggedIn());
      setLoading(false);
      if (preview) {
        removePost(post);
      } else {
        navigate("/");
      }
    }
  };

  const handleEditPost = async (e) => {
    e.stopPropagation();
    setEditing(!editing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    await updatePost(post._id, isLoggedIn(), { content });
    setPost({ ...post, content, edited: true });
    setEditing(false);
  };

  const handleLike = async (liked) => {
    if (liked) {
      setLikeCount(likeCount + 1);
      await likePost(post._id, user);
    } else {
      setLikeCount(likeCount - 1);
      await unlikePost(post._id, user);
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        //boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
        },
      }}
      className="post-card"
    >
      <Box className={preview}>
        <HorizontalStack spacing={2} alignItems="center">
          <Stack justifyContent="space-between" alignItems="center" sx={{ width: 60 }}>
          <LikeBox likeCount={likeCount} liked={post.liked} onLike={handleLike} />
          </Stack>
          <PostContentBox clickable={preview} post={post} editing={editing}>
            <HorizontalStack justifyContent="space-between">
              <ContentDetails
                username={post.poster.username}
                createdAt={post.createdAt}
                edited={post.edited}
                preview={preview === "secondary"}
              />
            </HorizontalStack>
            <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold", color: theme.palette.text.primary }}>
              {post.title}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Markdown content={post.content} />
            </Box>

            {/* Add Comments Icon and Count */}
            <HorizontalStack sx={{ mt: 2 }} justifyContent="space-between">
              <HorizontalStack>
                <AiFillMessage />
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                  {post.commentCount} {/* Display Comment Count */}
                </Typography>
              </HorizontalStack>

              {!hideLikeBox ? (
                <Box>
                  
                  <UserLikePreview postId={post._id} userLikePreview={post.userLikePreview} />
                </Box>
              ) : (
                <HorizontalStack>
                  {!hideLikeBox && (
      <AiFillLike color={theme.palette.primary.main} />  
    )}
                  {/* Top Post: Show only like count */}
                  <AiFillLike color={theme.palette.primary.main} /> {/* Like Icon */}
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                    {likeCount} Likes
                  </Typography>
                </HorizontalStack>
              )}
            </HorizontalStack>
          </PostContentBox>
        </HorizontalStack>
      </Box>
    </Card>
  );
};

export default PostCard;
