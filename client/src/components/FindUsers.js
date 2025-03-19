import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";
import UserEntry from "./UserEntry";
import HorizontalStack from "./util/HorizontalStack";

const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 5 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        padding: 2,
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)", 
        width: "100%", // Ensures full width in the container
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2, // Adds bottom margin for spacing between sections
      }}
    >
      <Stack spacing={2} width="100%"> {/* Full width to align items properly */}
        {/* Header Section */}
        <HorizontalStack
          justifyContent="space-between"
          sx={{
            width: "100%",
            alignItems: "center",
            paddingX: 1,
          }}
        >
          <HorizontalStack>
            <AiOutlineUser color="#3d52a0" />
            <Typography
              sx={{
                color: "#3d52a0",
                fontWeight: "bold",
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Find Others
            </Typography>
          </HorizontalStack>
          <IconButton
            sx={{ padding: 0 }}
            disabled={loading}
            onClick={handleClick}
          >
            <MdRefresh color="#3d52a0" />
          </IconButton>
        </HorizontalStack>

        <Divider />

        {/* Users List */}
        {loading ? (
          <Loading />
        ) : (
          users &&
          users.map((user) => (
            <UserEntry
              username={user.username}
              key={user.username}
              sx={{
                width: "100%", // Ensures the UserEntry aligns within the card
                paddingY: 1,
              }}
            />
          ))
        )}
      </Stack>
    </Card>
  );
};

export default FindUsers;
