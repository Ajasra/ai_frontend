import Head from "next/head";
import styles from "../styles/Home.module.css";
import Main from "../components/pages/Main";
import {
  AppShell,
  Header,
  Navbar,
  useMantineTheme,
  Text,
  MediaQuery,
  Aside,
  Footer,
  Burger,
} from "@mantine/core";
import { useState } from "react";
import { ColorThemeSwitch } from "../components/UI/Buttons/ColorThemeSwitch";
import AppHeader from "../components/UI/Layout/Header";
import AppNavbar from "../components/UI/Layout/Navbar";
import {AppFooter} from "../components/UI/Layout/Footer";

export default function Home() {
  return (
    <>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <AppNavbar />
        }
        // aside={
        //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //       <Text>Application sidebar</Text>
        //     </Aside>
        //   </MediaQuery>
        // }
        footer={
          <AppFooter />
        }
        header={<AppHeader />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Main />
      </AppShell>
    </>
  );
}
