import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "./index.css"; // Tailwind (if you use it)
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <MantineProvider
  theme={{
    fontFamily: 'Inter, sans-serif',
    primaryColor: 'indigo',
  }}
>
  <App />
</MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
