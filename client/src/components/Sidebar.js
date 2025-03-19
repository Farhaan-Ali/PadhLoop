import { Stack } from "@mui/material";
import React from "react";
import FindUsers from "./FindUsers";
import Footer from "./Footer";
import TopPosts from "./TopPosts";

const Sidebar = () => {
  return (
    <Stack spacing={2} alignItems="center">
      <TopPosts />
      <FindUsers />
      <Footer />
    </Stack>
  );
};

export default Sidebar;
