import { useContext, useEffect, useState } from "react";
import { Button, Container, Input, PasswordInput, Title } from "@mantine/core";
import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import { UserDispatchContext } from "../../../../User/UserContext";

import styles from "../../../../../styles/LoginForm.module.css";
import { userRegisterAPI } from "../../../../../utils/API/user_api";
import { IconMail } from "@tabler/icons-react";
import {ShowError, ShowSuccess} from "../../../../../utils/Notifications/nt_show";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  // const setUserDetails = useContext(UserDispatchContext);
  const userDetails = useContext(UserDispatchContext);

  const [proceed, setProceed] = useState(false);

  function Login() {
    // setUserDetails({
    //   ...userDetails,
    //   action: null,
    // });
  }

  function UpdateName(newName) {
    if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
    } else {
      setNameError("");
    }
    setName(newName);
  }

  function UpdateEmail(newEmail) {
    if (email.length < 3) {
      setEmailError("Email must be at least 3 characters");
    } else if (!email.includes("@")) {
      setEmailError("Email must have @ symbol");
    } else if (!email.includes(".")) {
      setEmailError("Email must have a domain name");
    } else {
      setEmailError("");
    }
    setEmail(newEmail);
  }

  function UpdatePassword(newPassword) {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
    setPassword(newPassword);
  }

  function UpdatePasswordConfirm(passwordConfirm) {
    if (passwordConfirm != password) {
      setPasswordConfirmError("Passwords must match");
    } else {
      setPasswordConfirmError("");
    }
    setPasswordConfirm(passwordConfirm);
  }

  useEffect(() => {
    if (
      !nameError && !emailError && !passwordError && !passwordConfirmError && name && email && password && passwordConfirm
    ) {
      setProceed(true);
    } else {
      setProceed(false);
    }
  }, [nameError, emailError, passwordError, passwordConfirmError]);

  async function Register() {
    if (proceed) {
      console.log("registering");
      userRegisterAPI(email, name, password).then((json) => {
        console.log(json);
        if (json["code"] == "200") {
          // setUserDetails({
          //   ...userDetails,
          //   user_email: email,
          //   action: null,
          // });
          ShowSuccess("Registration successful", "You can now login");
        } else {
          ShowError("Registration failed", json["response"]);
        }
      });
    } else {
      ShowError("Registration failed", "Please fill in all fields");
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
            UpdateName(val.currentTarget.value);
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
            UpdateEmail(val.currentTarget.value);
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
          UpdatePassword(val.currentTarget.value);
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
          UpdatePasswordConfirm(val.currentTarget.value);
        }}
      />
      <br />
      <Button onClick={Register} mr={20} disabled={!proceed}>
        Register
      </Button>
      <Button onClick={Login} mr={20} variant="outline">
        Login
      </Button>
    </Container>
  );
}
