import { useContext } from "react";
import { UserContext } from "../../../User/UserContext";
import { Container } from "@mantine/core";

import { SignUpPage } from "../../../pages/Signin";
import DocumentListPage from "../../Documents/DocumentPage";
import ConversationsListPage from "../../Conversations/ConversationsListPage";

export function Content() {
  const { user } = useContext(UserContext);

  return (
    <Container>
      {user?.user_id == null && <SignUpPage />}
      {user?.user_id !== null && (
        <>
          <DocumentListPage />
          <ConversationsListPage />
        </>
      )}
    </Container>
  );
}
