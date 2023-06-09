import {
  Burger,
  Group,
  Header,
  MediaQuery,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ColorThemeSwitch } from "../../Buttons/ColorThemeSwitch";
import { useContext, useState } from "react";

import styles from "../../../../styles/Header.module.css";
import { UserContext } from "../../../User/UserContext";

export default function AppHeader(props) {
  const { opened, setOpened } = props;

  const theme = useMantineTheme();

  return (
    <Header height={{ base: 70, md: 70 }} p="md">
      <Group position="apart" className={styles.Main}>
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Title>Your assistant</Title>
        <ColorThemeSwitch />
      </Group>
    </Header>
  );
}
