import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

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

const PostList = () => {
  const [users, setUsers] = useState([]);
  const [selectUser, setSlectUser] = useState("");
  const [postData, setPostData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const postDataUrl = `${process.env.REACT_APP_API_URL}/posts`;
  const userDataUrl = `${process.env.REACT_APP_API_URL}/users`;

  const getPostData = async () => {
    try {
      const response = await axios.get(postDataUrl);
      setPostData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(userDataUrl);
      setUsers(response.data);
    } catch (error) {
      console.log("error fetching users", error);
    }
  };

  useEffect(() => {
    getPostData();
    fetchUsers();
  }, [postDataUrl, userDataUrl]);

  const searchChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };
  const handleChange = (event) => {
    setSlectUser(Number(event.target.value));
  };

  // const filteredPosts = postData.filter((post) => {
  //   const user = users.find((user) => user.id === post.userId);
  //   const userName = user ? user.name.toLowerCase() : "";
  //   const searchMatch =
  //     !searchInput ||
  //     post.title.toLowerCase().includes(searchInput) ||
  //     String(post.userId).includes(searchInput) ||
  //     userName.includes(searchInput);

  //   const selectedUserMatch = !selectUser || post.userId === Number(selectUser);
  //   return selectedUserMatch && searchMatch;
  // });

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
                  {users?.map((user) => {
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
        {postData.length > 0 ? (
          postData.map((post) => (
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

export default PostList;
