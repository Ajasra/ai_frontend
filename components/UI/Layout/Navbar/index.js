import { Navbar, Text } from "@mantine/core";

import styles from "../../../../styles/Navbar.module.css";
import UserInfo from "../../UserInfo";
import { useContext } from "react";
import { UserContext } from "../../../User/UserContext";
import { UploadDocument } from "../../Forms/UploadDocument";

export default function AppNavbar() {
  const userDetails = useContext(UserContext);

  return (
    <Navbar
      width={{ sm: 300, lg: 300, base: 100 }}
      p="xs"
      className={styles.Navbar}
    >
      <Navbar.Section grow>
        {userDetails.user_id && <UploadDocument />}
      </Navbar.Section>
      <Navbar.Section>
        <UserInfo />
      </Navbar.Section>
    </Navbar>
  );
}
