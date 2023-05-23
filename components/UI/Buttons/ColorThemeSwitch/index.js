import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export function ColorThemeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme("dark");
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
    </ActionIcon>
  );
}
