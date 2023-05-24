import { useContext } from "react";
import { UserContext } from "../../../User/UserContext";
import { Container } from "@mantine/core";
import LoginForm from "../../Forms/User/Login";
import RequestForm from "../../Forms/RequestForm";
import { SignUpPage } from "../../../pages/Signin";
import DocumentListPage from "../../Documents/DocumentPage";
import { ConversationPage } from "../../Conversations/ConversationPage";

export function Content() {
  const userDetails = useContext(UserContext);

  return (
    <Container>
      {userDetails?.user_id == null ? (
        <SignUpPage />
      ) : userDetails?.document == null ? (
        <DocumentListPage />
      ) : (
        <>
          <ConversationPage />
        </>
      )}

      {/*{userDetails != null && <RequestForm />}*/}
    </Container>
  );
}
