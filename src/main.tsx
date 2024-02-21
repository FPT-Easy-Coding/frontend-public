import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./index.css";
import { MantineProvider } from "@mantine/core";

// Supports weights 300-800
import "@fontsource-variable/open-sans";
import UserCredentialsProvider from "./store/user-credentials-context.tsx";
const theme = {
  fontFamily: "Open Sans Variable, Helvetica, sans-serif",
  headings: {
    fontFamily: "Open Sans Variable, sans-serif",
  },
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider defaultColorScheme="light" theme={theme}>
    <UserCredentialsProvider>
      <App />
    </UserCredentialsProvider>
  </MantineProvider>
);
