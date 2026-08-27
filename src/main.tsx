import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import "./visual-polish.css"
import "./refine-v4.css"
import "./refine-v4-hotfix.css"
import "./terminal-v5.css"
import "./system-v6.css"
import "./protocol-v7.css"
import "./protocol-v7-hotfix.css"
import "./interaction-v8.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
