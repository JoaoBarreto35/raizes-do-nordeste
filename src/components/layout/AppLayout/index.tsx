import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./styles.module.css";

type AppLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { to: "/", label: "Início" },
  { to: "/canal", label: "Canais" },
  { to: "/unidades", label: "Unidades" },
  { to: "/totem", label: "Totem" },
  { to: "/admin", label: "Admin" },
  { to: "/privacidade", label: "Privacidade" },
];

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <a className={styles.skipLink} href="#main-content">
        Pular para o conteúdo
      </a>

      <div className={styles.shell}>
        <header className={styles.topbar}>
          <Link className={styles.brand} to="/">
            <span className={styles.brandIcon}>🌵</span>
            <span>Raízes do Nordeste</span>
          </Link>

          <nav className={styles.nav} aria-label="Navegação principal">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <div id="main-content">{children}</div>
      </div>
    </>
  );
}