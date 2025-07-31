import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress, Box } from "@mui/material";
import UserCard from "../components/UserCard";
import { getAllUsers } from "../redux/superAdmin/manageUserSlice";

const UserManagingPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.manageUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Box color="error.main">Error: {error}</Box>;

  return (
    <Grid container spacing={4}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserManagingPage;
