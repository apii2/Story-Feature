import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeSelector from "./components/themeSelector.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeSelector>
    <App />
  </ThemeSelector>,
);
