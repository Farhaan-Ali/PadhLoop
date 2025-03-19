import { Avatar, AvatarGroup, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import HorizontalStack from "./util/HorizontalStack";
import { AiFillLike } from "react-icons/ai";
import UserLikeModal from "./UserLikeModal";

const UserLikePreview = ({ postId, userLikePreview }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  let userLikes;
  if (userLikePreview) {
    userLikes = userLikePreview.slice(0, 3);
  }

  return (
    userLikes && (
      <>
        <Button
          variant="contained"
          size="medium"
          //startIcon={<AiFillLike />}
          color="primary"
          onClick={handleClick}
          sx={{
            borderRadius: "20px",
            padding: "8px 16px",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#6200EA",
            "&:hover": {
              backgroundColor: "#3700B3",
            },
          }}
        >
          <HorizontalStack spacing={1}>
            <AvatarGroup max={3} sx={{ alignItems: "center" }}>
              {userLikes &&
                userLikes.map((userLike) => (
                  <Avatar
                    src={`https://robohash.org/${userLike.username}`}
                    sx={{
                      backgroundColor: "lightgray",
                      width: 35,
                      height: 35,
                      border: "2px solid white",
                    }}
                    key={userLike._id}
                  />
                ))}
            </AvatarGroup>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "white" }}>
              {userLikePreview.length} Likes
            </Typography>
          </HorizontalStack>
        </Button>
        {open && (
          <UserLikeModal open={open} setOpen={setOpen} postId={postId} />
        )}
      </>
    )
  );
};

export default UserLikePreview;
