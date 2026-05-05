import { Route, Routes } from "react-router-dom";

import { AdminDashboard } from "../pages/AdminDashboard";
import { Cart } from "../pages/Cart";
import { ChooseChannel } from "../pages/ChooseChannel";
import { ChooseUnit } from "../pages/ChooseUnit";
import { Confirmation } from "../pages/Confirmation";
import { CustomerMenu } from "../pages/CustomerMenu";
import { Home } from "../pages/Home";
import { Identification } from "../pages/Identification";
import { Kiosk } from "../pages/Kiosk";
import { NotFound } from "../pages/NotFound";
import { Payment } from "../pages/Payment";
import { Privacy } from "../pages/Privacy";
import { Tracking } from "../pages/Tracking";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/canal" element={<ChooseChannel />} />
      <Route path="/unidades" element={<ChooseUnit />} />
      <Route path="/app/cardapio" element={<CustomerMenu />} />
      <Route path="/app/carrinho" element={<Cart />} />
      <Route path="/app/identificacao" element={<Identification />} />
      <Route path="/app/pagamento" element={<Payment />} />
      <Route path="/app/confirmacao" element={<Confirmation />} />
      <Route path="/app/status" element={<Tracking />} />
      <Route path="/totem" element={<Kiosk />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/privacidade" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}