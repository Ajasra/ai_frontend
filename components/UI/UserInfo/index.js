import {
  Box,
  Group,
  useMantineTheme,
  Text,
  Button,
  Avatar,
} from "@mantine/core";
import { useContext } from "react";
import { UserContext, UserDispatchContext } from "../../User/UserContext";

export default function UserInfo({ props }) {
  const theme = useMantineTheme();

  const {user} = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  function Logout() {
    setUserDetails({
      type: "RESET_USER",
    });
  }

  return (
    user?.user_id && (
      <Box mt={16}>
        <Group>
          <Avatar src="/user.jpg" radius="xl" />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user.user_name}
            </Text>
            <Text color="dimmed" size="xs">
              {user.email}
            </Text>
          </Box>
          <Button
            component="a"
            rel="noopener noreferrer"
            href="/"
            onClick={() => Logout()}
          >
            Logout
          </Button>
        </Group>
      </Box>
    )
  );
}
