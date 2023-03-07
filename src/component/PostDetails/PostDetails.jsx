import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { deepPurple } from "@mui/material/colors";
import { fetchPostById } from "../../feature/PostsSlice/Postslice.js";
import { Button, Divider, InputAdornment, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Loader from "../Loader/Loader.jsx";

const CommentTextField = styled(TextField)({
  width: "98%",
  m: "auto",
  marginBottom: 20,
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: deepPurple[500],
    },
  },
});

const PostDetails = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [id]);

  const getComments = () => {
    return comments.map((comment) => (
      <Card elevation={3} key={comment.id}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: deepPurple[500] }} aria-label='recipe'></Avatar>}
          title={comment.text}
          subheader={new Date().toLocaleDateString()}
        />
      </Card>
    ));
  };
  const handleComment = () => {
    if (!comment) {
      return;
    }
    setComments([
      ...comments,
      {
        id: Math.random(),
        text: comment,
      },
    ]);
  };

  const { activePost, loading } = useSelector((state) => state.posts);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card sx={{ m: "auto", mt: 4, maxWidth: "70%" }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: deepPurple[500] }} aria-label='recipe'></Avatar>}
            title={activePost.title}
            subheader={new Date().toUTCString()}
          />

          <CardContent>
            <Typography variant='body2' color='text.secondary' mb={2}>
              {activePost.body}
            </Typography>
            <Divider />
          </CardContent>
          <CardActions disableSpacing>
            <CommentTextField
              multiline
              placeholder='type your comment'
              id='comment'
              onChange={(e) => setComment(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle fontSize='large' />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='start'>
                    <Button sx={{ color: deepPurple[500] }} onClick={() => handleComment()}>
                      <ChatBubbleOutlineIcon fontSize='large' />
                    </Button>
                  </InputAdornment>
                ),
              }}
              variant='outlined'
              size='medium'
            />
          </CardActions>
          {comments.length > 0 && getComments()}
        </Card>
      )}
    </>
  );
};

export default PostDetails;
