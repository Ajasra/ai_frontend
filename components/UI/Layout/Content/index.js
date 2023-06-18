import { useContext } from "react";
import { UserContext } from "../../../User/UserContext";
import { Container } from "@mantine/core";

import { SignUpPage } from "../../../pages/Signin";
import DocumentListPage from "../../Documents/DocumentPage";
import { ConversationPage } from "../../Conversations/ConversationPage";
import ConversationsListPage from "../../Conversations/ConversationsListPage";
import { AdminContent } from "../../../Admin/Pages/Content";

export function Content() {
  const userDetails = useContext(UserContext);

  console.log(userDetails?.page);

  return (
    <Container>
      {userDetails?.user_id == null && <SignUpPage />}
      {userDetails?.page.type === "admin" && <AdminContent />}
      {userDetails?.page.type !== "conversation" &&
          userDetails?.page.type !== "admin" && (
          <>
            <DocumentListPage />
            <ConversationsListPage />
          </>
        )}
      {userDetails?.page.type === "conversation" &&
          (userDetails?.conversation != null || userDetails?.document != null) && (
          <>
            <ConversationPage />
          </>
        )}
      {/*{userDetails != null && <RequestForm />}*/}
    </Container>
  );
}
