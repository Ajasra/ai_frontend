import { Container, Title } from "@mantine/core";
import RequestForm from "../../UI/Forms/RequestForm";
import { UserContext } from "../../User/UserContext";
import { useContext } from "react";
import LoginForm from "../../UI/Forms/User/Login";

export default function Main() {
  const userDetails = useContext(UserContext);

  return (
    <Container>
      {userDetails == null && <LoginForm />}

      {userDetails != null && <RequestForm />}
    </Container>
  );
}
