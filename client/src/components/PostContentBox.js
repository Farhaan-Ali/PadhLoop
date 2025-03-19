import { useTheme } from "@emotion/react";
import { Skeleton } from '@mui/material';
import { autocompleteClasses, Box, Card, CardActionArea } from "@mui/material";
import React from "react";
import "react-router-dom";
import { useNavigate } from "react-router-dom";


const PostContentBox = (props) => {
  const { clickable, post, editing } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {clickable && !editing ? (
       <CardActionArea 
  sx={{
    p: theme.spacing(3),
    borderRadius: 2,
    width:"92%",
    transition: 'background-color 0.3s ease',
    //"&:hover": { backgroundColor: theme.palette.action.hover, transform: "scale(1.02)" }
  }} 
  onClick={() => navigate("/posts/" + post._id)}
>
  {props.children}
</CardActionArea>

      ) : (
        <Box sx={{ padding: theme.spacing(2), width: "90%" }}>
          {props.children}
        </Box>
      )}
    </>
  );
};

export default PostContentBox;
