import { Button, IconButton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AiFillEdit, AiOutlineLine, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";
import CommentEditor from "./CommentEditor";
import ContentDetails from "./ContentDetails";
import HorizontalStack from "./util/HorizontalStack";
import { deleteComment, updateComment } from "../api/posts";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";
import { MdCancel } from "react-icons/md";
import { BsReplyFill } from "react-icons/bs";
import Moment from "react-moment";
import {BiTrash} from "react-icons/bi"
const Comment = (props) => {
  const theme = useTheme();
  const iconColor = '#39FF14'; // Hilighting actions neon green
  const textColor = '#F0F0F0';
  const { depth, addComment, removeComment, editComment } = props;
  const commentData = props.comment;
  const [minimised, setMinimised] = useState(depth % 4 === 3);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(commentData);
  const user = isLoggedIn();
  const isAuthor = user && user.userId === comment.commenter._id;
  const navigate = useNavigate();

  const handleSetReplying = () => {
    if (isLoggedIn()) {
      setReplying(!replying);
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    await updateComment(comment._id, user, { content });
    const newCommentData = { ...comment, content, edited: true };
    setComment(newCommentData);
    editComment(newCommentData);
    setEditing(false);
  };

  const handleDelete = async () => {
    await deleteComment(comment._id, user);
    removeComment(comment);
  };

  let style = {
    backgroundColor: '#F0F0F1', // Dark backgrnd for comments
    // padding: '10px',
    // fontColor: '#0000FF',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    fontFamily: 'Poppins, sans-serif'
  };

  return (
    <Box sx={style}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <ContentDetails
          username={comment.commenter.username}
          createdAt={comment.createdAt}
          edited={comment.edited}
        />
        <IconButton onClick={() => setMinimised(!minimised)}>
          {minimised ? <AiOutlinePlus color={iconColor} /> : <AiOutlineLine color={iconColor} />}
        </IconButton>
      </Box>

      {!minimised && (
        <Box sx={{ mt: 1 }}>
          {!editing ? (
            <Markdown content={comment.content} />
          ) : (
            <ContentUpdateEditor handleSubmit={handleSubmit} originalContent={comment.content} />
          )}

          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
            <IconButton onClick={handleSetReplying}>
              {replying ? <MdCancel color={iconColor} /> : <BsReplyFill color={iconColor} />}
            </IconButton>

            {isAuthor && (
              <>
                <IconButton onClick={() => setEditing(!editing)}>
                  {editing ? <MdCancel color={iconColor} /> : <AiFillEdit color={iconColor} />}
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <BiTrash color={theme.palette.error.main} />
                </IconButton>
              </>
            )}
          </Box>

          {replying && (
            <Box sx={{ mt: 2 }}>
              <CommentEditor
                comment={comment}
                addComment={addComment}
                setReplying={setReplying}
                label="What are your thoughts?"
              />
            </Box>
          )}

          {comment.children && (
            <Box sx={{ pt: theme.spacing(2) }}>
              {comment.children.map((reply, i) => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  depth={depth + 1}
                  addComment={addComment}
                  removeComment={removeComment}
                  editComment={editComment}
                />
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Comment;
