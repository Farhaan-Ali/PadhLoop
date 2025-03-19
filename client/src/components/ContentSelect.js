import { MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import HorizontalStack from "./util/HorizontalStack";

const ContentSelect = () => {
  const [content, setContent] = useState("post");

  return (
    <HorizontalStack spacing={1}>
      <Typography sx={{ color: "#3d52a0", fontWeight: "bold" }}>Content:</Typography>
      <Select
        size="small"
        value={content}
        sx={{
          minWidth: 150,
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: "#fff",
          borderRadius: 2,
          "& .MuiSelect-select": {
            padding: "8px 12px",
            color: "#3d52a0",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8697c4",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7091e6",
          },
        }}
        onChange={(e) => setContent(e.target.value)}
      >
        <MenuItem value={"post"}>Posts</MenuItem>
        <MenuItem value={"comment"}>Comments</MenuItem>
      </Select>
    </HorizontalStack>
  );
};

export default ContentSelect;
