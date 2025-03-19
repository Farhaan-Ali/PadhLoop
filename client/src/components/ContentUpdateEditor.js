import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const ContentUpdateEditor = (props) => {
  const [content, setContent] = useState(props.originalContent);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    let error = null;

    if (props.validate) {
      error = props.validate(content);
    }

    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: "#ede8f5", padding: 2, borderRadius: 2 }}>
      <Stack spacing={1}>
        <TextField
          value={content}
          fullWidth
          margin="normal"
          name="content"
          sx={{ backgroundColor: "white" }}
          onChange={handleChange}
          error={error.length !== 0}
          helperText={error}
          multiline
          rows={4}
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#3d52a0", color: "#fff", "&:hover": { backgroundColor: "#7091e6" } }}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
};

export default ContentUpdateEditor;
