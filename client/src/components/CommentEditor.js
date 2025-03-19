import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createComment } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import ErrorAlert from "./ErrorAlert";
import HorizontalStack from "./util/HorizontalStack";

const CommentEditor = ({ label, comment, addComment, setReplying }) => {
  const [formData, setFormData] = useState({
    content: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      parentId: comment && comment._id,
    };

    setLoading(true);
    const data = await createComment(body, params, isLoggedIn());
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      formData.content = "";
      setReplying && setReplying(false);
      addComment(data);
    }
  };

  const handleFocus = (e) => {
    !isLoggedIn() && navigate("/login");
  };

  return (
    <Card sx={{ padding: 3, backgroundColor: "#f7faff", borderRadius: 2, boxShadow: 2 }}>
      <Stack spacing={2}>
        <HorizontalStack justifyContent="space-between">
          <Typography variant="h5" sx={{ color: "#3d52a0" }}>
            {comment ? <>Reply</> : <>Comment</>}
          </Typography>
          <Typography variant="body2" sx={{ color: "#8697c4" }}>
            <a href="/suggestions" target="_blank">
              Suggestions?
            </a>
          </Typography>
        </HorizontalStack>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            multiline
            fullWidth
            label={label}
            rows={5}
            required
            name="content"
            sx={{
              backgroundColor: "#ffffff", borderRadius: 2, border: "1px solid #adbbda",
            }}
            onChange={handleChange}
            onFocus={handleFocus}
            value={formData.content}
          />

          <ErrorAlert error={error} sx={{ my: 4 }} />
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            disabled={loading}
              sx={{
                backgroundColor: "#3d52a0",
                color: "#fff",
                borderRadius: 2,
                mt: 2,
                "&:hover": {
                  backgroundColor: "#7091e6",
                },
            }}
          >
            {loading ? <div>just a minute</div> : <div>Post Answer </div>}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default CommentEditor;
