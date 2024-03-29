import { Container, Input, PasswordInput, Button, Title } from "@mantine/core";
import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";

import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../../User/UserContext";

import styles from "../../../../../styles/LoginForm.module.css";
import { userLoginAPI } from "../../../../../utils/API/user_api";
import { IconMail } from "@tabler/icons-react";
import {
  ShowError,
  ShowSuccess,
} from "../../../../../utils/Notifications/nt_show";
import { showNotification } from "@mantine/notifications";

export default function LoginForm(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [proceed, setProceed] = useState(false);

  function Register() {
    setUserDetails({
      ...userDetails,
      action: "register",
    });
  }

  function CheckEmail(email) {
    if (email.length < 3) {
      setNameError("Email must be at least 3 characters");
    } else if (!email.includes("@")) {
      setNameError("Email must have @ symbol");
    } else if (!email.includes(".")) {
      setNameError("Email must have a domain name");
    } else {
      setNameError("");
    }
    setName(email);
  }

  function UpdatePassword(newPassword) {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
    setPassword(newPassword);
  }

  useEffect(() => {
    if (!nameError && !passwordError && name && password) {
      setProceed(true);
    } else {
      setProceed(false);
    }
  }, [nameError, passwordError, name, password]);

  async function Login() {
    if (proceed) {
      const json = await userLoginAPI(name, password);
      if (json.code === 200) {
        const user = json.response;
        setUserDetails({
          type: "SET_USER",
          payload: {
            action: null,
            user_id: user.user_id,
            user_name: user.name,
            hash: user.password,
            email: user.email,
            user_role: user.role,
          },
        });
        ShowSuccess("Login", user.name + " logged in successfully");
      } else {
        ShowError("Login", json.response);
      }
    }
  }

  useEffect(() => {
    if (userDetails && userDetails?.user_email) {
      setName(userDetails.user_email);
    }
  }, [userDetails]);

  return (
    <Container className={styles.LoginForm}>
      <Title order={2}>Login</Title>
      <Input.Wrapper id="login" withAsterisk label="Username" error={nameError}>
        <Input
          id="login"
          icon={<IconMail />}
          placeholder="Your email"
          onChange={(val) => {
            CheckEmail(val.currentTarget.value);
          }}
          value={name}
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
      <Button onClick={Login} mr={20} disabled={!proceed}>
        Login
      </Button>
      <Button onClick={Register} mr={20} variant="outline">
        Register
      </Button>
      {/*<Button variant="outline">Forgot password?</Button>*/}
    </Container>
  );
}
