import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { deepPurple } from "@mui/material/colors";
import { Button, Divider, InputAdornment, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CallIcon from "@mui/icons-material/Call";
import { Stack } from "@mui/system";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { addComment, fetchPostDetails } from "./PostDetailsSlice";
import Loader from "./../../component/Loader/Loader";

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

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const PostDetailsView = () => {
  const [comment, setComment] = useState({
    email: "islam.sa3idzak@gmail.com",
    name: "islam said",
    body: "",
  });
  const { loading, user, comments, activePost } = useSelector(
    (state) => state.postDetails
  );

  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetails(postId));
  }, [postId]);

  const handleComment = () => {
    if (comment.body) {
      dispatch(addComment(comment));
      setComment({
        ...comment,
        body: "",
      });
    }
  };

  const getComments = () => {
    return comments.map((comment) => (
      <Card elevation={4} key={comment.id} sx={{ mb: 1 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              aria-label="recipe"
              {...stringAvatar(comment.name)}
            ></Avatar>
            <Stack direction="column">
              <Typography variant="body1" color="text.primary">
                {comment.email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
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
              <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="recipe">
                {user.name.substr(0, 1)}
              </Avatar>
            }
            title={user.name}
            subheader={
              <Stack direction="column" spacing={1}>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "start",
                    mt: "5px",
                  }}
                  color="rgba(0, 0, 0, 0.6)"
                >
                  <CallIcon fontSize="small" /> {user.phone}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "start",
                  }}
                  color="rgba(0, 0, 0, 0.6)"
                >
                  <ApartmentIcon fontSize="small" /> {user.company.name}
                </Typography>
              </Stack>
            }
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {activePost.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={2}>
              {activePost.body}
            </Typography>
            <Divider />
          </CardContent>
          <CardActions disableSpacing>
            <CommentTextField
              multiline
              placeholder="type your comment"
              id="comment"
              value={comment.body}
              onChange={(e) => setComment({ ...comment, body: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="large" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <Button
                      sx={{ color: deepPurple[500] }}
                      onClick={() => handleComment()}
                    >
                      <ChatBubbleOutlineIcon fontSize="large" />
                    </Button>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="medium"
            />
          </CardActions>
          {comments.length > 0 && getComments()}
          <CardActions mt={2}>
            <NavLink
              to={`../user/1`}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
              }}
            >
              <Button
                size="large"
                sx={{
                  color: deepPurple[500],
                  fontWeight: "bold",
                }}
              >
                VIEW All POSTS
              </Button>
            </NavLink>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default PostDetailsView;
