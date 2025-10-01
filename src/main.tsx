import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme on app load
const savedTheme = localStorage.getItem('theme');
const isDark = savedTheme === 'dark' || savedTheme === null; // Default to dark
document.documentElement.classList.toggle('dark', isDark);

createRoot(document.getElementById("root")!).render(<App />);
