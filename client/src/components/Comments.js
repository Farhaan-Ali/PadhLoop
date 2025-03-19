import { Stack, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import Loading from "./Loading";
import { getComments } from "../api/posts";
import { useParams } from "react-router-dom";
import CommentEditor from "./CommentEditor";

const Comments = () => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const data = await getComments(params);
      if (!data.error) {
        setComments(data);
      }
      setLoading(false);
    };
    fetchComments();
  }, []);

  return comments ? (
    <Stack spacing={2} sx={{ backgroundColor: "#ede8f5", p: 3, borderRadius: 2, fontFamily: 'Poppins, sans-serif' }}>
      <CommentEditor addComment={(comment) => setComments([comment, ...comments])} label="What are your thoughts on this post?" />
      {comments.length > 0 ? (
        <Box pb={4}>
          {comments.map((comment, i) => (
            <Comment key={comment._id} comment={comment} depth={0} />
          ))}
          {loading && <Loading />}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" textAlign="center" paddingY={3}>
          <Typography variant="h5" component="p" color="text.secondary" fontFamily={'Poppins, sans-serif'} sx={{
          color: "text.primary",
          textAlign: "center",
        }}>No answers yet... </Typography>
          <Typography variant="h5" color="text.secondary"> Be the first one to answer!</Typography>
        </Box>
      )}
    </Stack>
  ) : (
    <Loading label="Loading answers" />
  );
};

export default Comments;
