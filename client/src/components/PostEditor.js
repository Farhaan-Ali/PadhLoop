import {
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await createPost(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/posts/" + data._id);
    }
  };

  const validate = () => {
    const errors = {};
    // Add custom validation logic here
    return errors;
  };

  return (
    <Card
      sx={{
        maxWidth: "700px",
        margin: "auto",
        mt: 5,
        p: 3,
        borderRadius: 3,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        backgroundColor: "background.paper",
      }}
    >
      <Stack spacing={2}>
        {user && (
          <HorizontalStack spacing={2} alignItems="center">
            <UserAvatar width={50} height={50} username={user.username} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              What would you like to post today, {user.username}?
            </Typography>
          </HorizontalStack>
        )}

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Need help with formatting? Check out our{" "}
          <Link
            href="https://commonmark.org/help/"
            target="_blank"
            rel="noopener"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Markdown Guide
          </Link>
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            label="Title"
            required
            name="title"
            margin="normal"
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            fullWidth
            label="Content"
            multiline
            rows={10}
            name="content"
            margin="normal"
            onChange={handleChange}
            error={!!errors.content}
            helperText={errors.content}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <ErrorAlert error={serverError} />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              backgroundColor: loading ? "grey.400" : "primary.main",
              color: "white",
              borderRadius: 3,
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            {loading ? <>Submitting...</> : <>Submit</>}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;
