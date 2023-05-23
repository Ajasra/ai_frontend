import { useContext, useState } from "react";
import { Button, Container, Input, PasswordInput, Title } from "@mantine/core";
import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import { UserDispatchContext } from "../../../../User/UserContext";

import styles from "../../../../../styles/LoginForm.module.css";
import { registerUser } from "../../../../../utils/API/user_api";
import { IconMail } from "@tabler/icons-react";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const setUserDetails = useContext(UserDispatchContext);
  const userDetails = useContext(UserDispatchContext);

  function Login() {
    setUserDetails({
      ...userDetails,
      action: null,
    });
  }

  async function Register() {
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

    if (passwordConfirm !== password) {
      setPasswordConfirmError("Passwords must match");
      continueLogin = false;
    } else {
      setPasswordConfirmError("");
    }

    // check if the email is valid and have @ symbol, have domain name and have a valid domain name
    if (email.length < 3) {
      setEmailError("Email must be at least 3 characters");
      continueLogin = false;
    } else if (!email.includes("@")) {
      setEmailError("Email must have @ symbol");
      continueLogin = false;
    } else if (!email.includes(".")) {
      setEmailError("Email must have a domain name");
      continueLogin = false;
    } else {
      setEmailError("");
    }

    if (continueLogin) {
      console.log("registering");
      registerUser(email, name, password).then((json) => {
        console.log(json);
        if (json["code"] == "200") {
          setUserDetails({
            ...userDetails,
            action: null,
          });
        } else {
          setNameError("Invalid username or password");
        }
      });
    } else {
      console.log("login failed");
    }
  }

  return (
    <Container className={styles.LoginForm}>
      <Title order={2}>Registration</Title>
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
      <Input.Wrapper id="email" withAsterisk label="Email" error={emailError}>
        <Input
          id="email"
          icon={<IconMail />}
          placeholder="Your email"
          onChange={(val) => {
            setEmail(val.currentTarget.value);
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
      <PasswordInput
        placeholder=" Repeat Password"
        label="Repeat Password"
        withAsterisk
        icon={<LockClosedIcon />}
        error={passwordConfirmError}
        onChange={(val) => {
          setPasswordConfirm(val.currentTarget.value);
        }}
      />
      <br />
      <Button onClick={Register} mr={20}>
        Register
      </Button>
      <Button onClick={Login} mr={20} variant="outline">
        Login
      </Button>
    </Container>
  );
}
