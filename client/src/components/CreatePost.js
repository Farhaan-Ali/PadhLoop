import { Button, TextField, Chip, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const CreatePost = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
    }
    setTagInput("");
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Stack spacing={2}>
      {/* Existing fields for post creation */}
      
      <Button
        variant="outlined"
        size="medium"
        onClick={() => {
          // Code to handle post creation, including sending `tags` to the backend
          navigate("/posts/create");
        }}
        sx={{
          gap: "0.5rem",
          fontSize: "17px",
          fontFamily: "Poppins, sans-serif",
          borderColor: "#3d52a0",
          color: "#3d52a0",
          "&:hover": {
            backgroundColor: "#7091e6",
            color: "#fff",
          },
        }}
      >
        <AiOutlinePlus />
        Ask Doubt
      </Button>
    </Stack>
  );
};

export default CreatePost;
