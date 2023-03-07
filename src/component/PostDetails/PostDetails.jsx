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
import { fetchPostDetails, fetchPosts } from "../../feature/PostsSlice/Postslice.js";
import { Button, Divider, InputAdornment, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Loader from "../Loader/Loader.jsx";
import CallIcon from "@mui/icons-material/Call";
import { Stack } from "@mui/system";
import ApartmentIcon from "@mui/icons-material/Apartment";
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
  const [comment, setComment] = useState("");
  const { activePost, loading, user, comments } = useSelector((state) => state.posts);
  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetails(postId));
  }, [postId]);

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

  const getComments = () => {
    return comments.map((comment) => (
      <Card elevation={4}>
        <CardContent>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label='recipe'>
              {comment.email.substr(0, 1)}
            </Avatar>
            <Stack direction='column' spacing={1}>
              <Typography variant='body1' color='text.primary'>
                {comment.email}
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                {comment.body}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    ));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card sx={{ m: "auto", mt: 4, maxWidth: "70%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label='recipe'>
                {user.name.substr(0, 1)}
              </Avatar>
            }
            title={user.name}
            subheader={
              <Stack direction='column' spacing={1}>
                <Typography
                  variant='body2'
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "start",
                    mt: "5px",
                  }}
                  color='rgba(0, 0, 0, 0.6)'
                >
                  <CallIcon fontSize='small' /> {user.phone}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "start" }}
                  color='rgba(0, 0, 0, 0.6)'
                >
                  <ApartmentIcon fontSize='small' /> {user.company.name}
                </Typography>
              </Stack>
            }
          />

          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {activePost.title}
            </Typography>

            <Typography variant='body1' color='text.secondary' mb={2}>
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
          {getComments()}
        </Card>
      )}
    </>
  );
};

export default PostDetails;
