import {
  Avatar,
  Box,
  Group,
  rem,
  UnstyledButton,
  useMantineTheme,
  Text, Button,
} from "@mantine/core";
import { useContext } from "react";
import { UserContext, UserDispatchContext } from "../../User/UserContext";

export default function UserInfo({props}) {
  const theme = useMantineTheme();

  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      {userDetails != null && (
        <Group>
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Amy Horsefighter
            </Text>
            <Text color="dimmed" size="xs">
              ahorsefighter@gmail.com
            </Text>
          </Box>
        </Group>
        )}
    </Box>
  );
}
