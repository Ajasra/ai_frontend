import { Container, Input, PasswordInput, Button, Title } from "@mantine/core";
import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";

import { useContext, useState } from "react";
import { UserDispatchContext } from "../../../../User/UserContext";

import styles from "../../../../../styles/LoginForm.module.css";
import { loginUser } from "../../../../../utils/API/user_api";

export default function LoginForm(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const userDetails = useContext(UserDispatchContext);
  const setUserDetails = useContext(UserDispatchContext);

  function Register() {
    setUserDetails({
      ...userDetails,
      action: "register",
    });
  }

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
      const json = await loginUser(name, password);
      if (json["code"] == "200") {
        setUserDetails({
          ...userDetails,
          action: null,
          user_id: json["data"]["user_id"],
          user_name: json["data"]["name"],
          hash: json["data"]["password"],
          email: json["data"]["email"],
        });
        // setResponse(json['response']['message'])
      } else {
        setNameError("Invalid username or password");
      }
    } else {
      console.log("login failed");
    }
  }

  return (
    <Container className={styles.LoginForm}>
      <Title order={2}>Login</Title>
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
      <Button onClick={Login} mr={20}>
        Login
      </Button>
      <Button onClick={Register} mr={20} variant="outline">
        Register
      </Button>
      {/*<Button variant="outline">Forgot password?</Button>*/}
    </Container>
  );
}
