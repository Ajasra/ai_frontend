import "../styles/globals.css";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";
import { UserProvider } from "../components/User/UserContext";
import { Notifications } from "@mantine/notifications";

function MyApp({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState("dark");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications limit={5} />
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
