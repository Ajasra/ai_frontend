import AppNavbar from "../Navbar";
import { AppFooter } from "../Footer";
import AppHeader from "../Header";
import { AppShell } from "@mantine/core";
import { useState } from "react";

export function AppShellLayout(props) {
  const { children } = props;

  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="md"
      // asideOffsetBreakpoint="sm"
      navbar={<AppNavbar opened={menuOpened} setOpened={setMenuOpened} />}
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      footer={<AppFooter />}
      header={<AppHeader opened={menuOpened} setOpened={setMenuOpened} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
