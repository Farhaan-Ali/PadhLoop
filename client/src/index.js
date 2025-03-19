import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById("root"));
document.body.style.backgroundColor = "#ede8f5";
document.body.style.margin = "0";
document.body.style.height = "100vh";

root.render(<App />);
