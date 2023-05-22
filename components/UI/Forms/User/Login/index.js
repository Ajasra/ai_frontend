import { Container, Input, PasswordInput, Button } from "@mantine/core";
import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";

import { useContext, useState } from "react";
import { UserDispatchContext } from "../../../../User/UserContext";

import styles from "../../../../../styles/LoginForm.module.css";

export default function LoginForm(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const setUserDetails = useContext(UserDispatchContext);

  async function Login() {
    let continueLogin = true;

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      continueLogin = false;
    } else {
      setNameError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      continueLogin = false;
    } else {
      setPasswordError("");
    }

    if (continueLogin) {
      setUserDetails({
        userId: 1,
        username: "test",
      });
    } else {
      console.log("login failed");
    }
  }

  return (
    <Container className={styles.LoginForm}>
      <Input.Wrapper id="login" withAsterisk label="Username" error={nameError}>
        <Input
          id="login"
          icon={<PersonIcon />}
          placeholder="Your name"
          onChange={(val) => {
            setName(val.currentTarget.value);
          }}
        />
      </Input.Wrapper>
      <br />
      <PasswordInput
        placeholder="Password"
        label="Password"
        withAsterisk
        icon={<LockClosedIcon />}
        error={passwordError}
        onChange={(val) => {
          setPassword(val.currentTarget.value);
        }}
      />
      <br />
      <Button onClick={Login} mr={20}>Login</Button>
      <Button mr={20}>Register</Button>
      {/*<Button variant="outline">Forgot password?</Button>*/}
    </Container>
  );
}
