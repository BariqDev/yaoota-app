import { Avatar, CardHeader, Container, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { deepPurple } from "@mui/material/colors";
import { fetchPosts, fetchPostsByUser, getPostsByPage } from "./PostsSlice";
import { Link, NavLink, useParams } from "react-router-dom";
import Loader from "../../component/Loader/Loader";
import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";
import SearchPosts from "../../component/SearchPosts";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
export const randomDate = () => {
  const start = new Date().getTime();
  const end = new Date().getTime() * Math.random() * 1000;
  const randomTime = Math.random() * (end - start);
  return new Date(randomTime).toDateString();
};
export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const PostSliceView = () => {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const { activePosts, loading, userName } = useSelector((state) => state.posts);
  useEffect(() => {
    if (userId) {
      dispatch(fetchPostsByUser(userId));
      scrollTop();
    } else {
      dispatch(fetchPosts());
    }
  }, [userId]);

  const { pages } = useSelector((state) => state.posts);

  const handleChange = (page) => {
    dispatch(getPostsByPage(page));
    scrollTop();
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth='xl'>
          <SearchPosts />
          {userId && (
            <Card elevation={3}>
              <CardContent>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography variant='h6'> Posts By {userName}</Typography>
                  <NavLink to='../'>
                    <HighlightOffIcon fontSize='large' />
                  </NavLink>
                </Stack>
              </CardContent>
            </Card>
          )}
          <Grid container spacing={3} mt={userId ? 1 : 4}>
            {activePosts.map((post) => {
              return (
                <Grid item xs={12} md={4} lg={3} key={post.id}>
                  <Card sx={{ minWidth: 275, height: 200 }} elevation={3}>
                    <CardContent sx={{ height: 120 }}>
                      <Typography gutterBottom variant='h5' component='div'>
                        {post.title.length > 29 ? `${post.title.substr(0, 22)} ...` : post.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {post.body.length > 150 ? `${post.body.substr(0, 147)} ...` : post.body}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <NavLink
                        to={`/post/${post.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          fontWeight: "bold",
                        }}
                      >
                        <Button
                          size='small'
                          sx={{
                            color: deepPurple[500],
                            fontWeight: 500,
                          }}
                        >
                          VIEW POST
                        </Button>
                      </NavLink>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Stack direction='row' alignItems='center' justifyContent='center' mt={4}>
            {!loading && pages > 1 && (
              <Pagination
                count={pages}
                color='primary'
                onChange={(e, page) => handleChange(page)}
                sx={{ backgroundColor: "white", borderRadius: 5, p: 1 }}
              />
            )}
          </Stack>
        </Container>
      )}
    </>
  );
};

export default PostSliceView;
