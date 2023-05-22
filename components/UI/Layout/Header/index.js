import {
  Burger,
  Group,
  Header,
  MediaQuery,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ColorThemeSwitch } from "../../Buttons/ColorThemeSwitch";
import { useState } from "react";

import styles from "../../../../styles/Header.module.css";

export default function AppHeader() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Group position="apart" className={styles.Main}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
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
