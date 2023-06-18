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

  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  function Logout() {
    setUserDetails({
      ...userDetails,
      user_email: null,
      action: null,
      documents: null,
      email: null,
      userConversations: null,
      user_id: null,
      user_name: null,
      user_role: null,
      hash: null,
    });
    localStorage.removeItem("user");
  }

  return (
    <Box mt={16}>
      {userDetails?.user_id != null && (
        <>
          <Group>
            {/*<Avatar*/}
            {/*  src="/user.jpg"*/}
            {/*  radius="xl"*/}
            {/*/>*/}
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {userDetails.user_name}
              </Text>
              <Text color="dimmed" size="xs">
                {userDetails.email}
              </Text>
            </Box>
            <Button onClick={() => Logout()}>Logout</Button>
          </Group>
        </>
      )}
    </Box>
  );
}
