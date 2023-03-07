import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Divider, InputAdornment, TextField } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { serchPosts } from "../feature/PostsSlice/Postslice";
const CommentTextField = styled(TextField)({
  width: "98%",
  m: "auto",
  background: "white",
  borderRadius: 5,
  marginBottom: 20,
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: deepPurple[500],
    },
  },
});

const SearchPosts = () => {
  const [search, setSearch] = useState("");
  const handleSearch = () => {};
  const dispatch = useDispatch(serchPosts());
  return (
    <Stack direction='row' justifyContent='center' alignItems='center' mt={2}>
      <CommentTextField
        sx={{ width: 400 }}
        placeholder='search by title'
        id='search'
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='start'>
              <Button sx={{ color: deepPurple[500] }} onClick={handleSearch}>
                <SearchIcon fontSize='large' />
              </Button>
            </InputAdornment>
          ),
        }}
        size='medium'
      />
    </Stack>
  );
};

export default SearchPosts;
