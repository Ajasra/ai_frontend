import {Navbar, Text} from "@mantine/core";

import styles from "../../../../styles/Navbar.module.css";
import UserInfo from "../../UserInfo";

export default function AppNavbar(){
    return(
        <Navbar width={{ sm: 300, lg: 300, base: 100 }} p="xs" className={styles.Navbar}>
            <Navbar.Section grow>
                here will be documents and conversations
            </Navbar.Section>
            <Navbar.Section>
                <UserInfo />
            </Navbar.Section>
        </Navbar>
    )
}