import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


import { OrderProvider } from "./app/providers/OrderProvider";
import "./styles/global.css";
import { App } from './app/App';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <OrderProvider>
        <App />
      </OrderProvider>
    </BrowserRouter>
  </StrictMode>
);