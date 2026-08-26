import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import "./visual-polish.css"
import "./refine-v4.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
