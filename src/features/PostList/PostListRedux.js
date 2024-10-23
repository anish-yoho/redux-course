import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./PostSlice";
import { fetchUsers } from "./UserSlice";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const PostListRedux = () => {
  const [selectUser, setSlectUser] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Dispatching fetchPosts action...");
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const postData = useSelector((state) => state.posts.posts);
  const userData = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error:{error}</div>;
  }

  if (!postData || postData.lengt === 0) {
    return <div>No post found</div>;
  }

  console.log("posts", postData);
  console.log("users", userData);

  const searchChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };
  const handleChange = (event) => {
    setSlectUser(Number(event.target.value));
  };

  const filteredPosts = postData.filter((post) => {
    const user = userData.find((user) => user.id === post.userId);
    const userName = user ? user.name.toLowerCase() : "";
    const searchMatch =
      !searchInput ||
      post.title.toLowerCase().includes(searchInput) ||
      String(post.userId).includes(searchInput) ||
      userName.includes(searchInput);
    const selectedUserMatch = !selectUser || post.userId === Number(selectUser);

    return selectedUserMatch && searchMatch;
  });

  return (
    <Fragment>
      <Grid container>
        <Grid xs={12} sx={{ display: "flex", padding: "1rem" }}>
          <Grid xs={3} />
          <Grid
            xs={6}
            sx={{ padding: "1rem", display: "flex", justifyContent: "center" }}
          >
            <div>
              <FormControl sx={{ m: 1 }} variant="" fullWidth>
                <InputLabel htmlFor="post">Search by keywords</InputLabel>
                <BootstrapInput
                  id="demo-customized-textbox"
                  placeholder="Search keywords"
                  onChange={searchChange}
                  value={searchInput}
                />
              </FormControl>

              <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
                <InputLabel id="author">Select Author</InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  label="Age"
                  value={selectUser || ""}
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>Select by author</em>
                  </MenuItem>
                  {userData?.map((user) => {
                    return (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid xs={3} />
        </Grid>
        {filteredPosts.length > 0 ? (
          filteredPosts?.map((post) => (
            <Grid item xs={12} sm={4} key={post.id} spacing={3} p={3}>
              <Card sx={{ border: "1px solid white" }} className="Card">
                <CardHeader title={post.title} sx={{ height: "100px" }} />
                <CardContent sx={{ height: "100px" }}>{post.body}</CardContent>
                <CardActions>
                  <Box sx={{ display: "flex" }}>
                    <p>User ID: </p>
                    <p>{post.userId}</p>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <p>No post found</p>
        )}
      </Grid>
    </Fragment>
  );
};

export default PostListRedux;
