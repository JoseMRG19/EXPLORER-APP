import { NavLink } from 'react-router-dom';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app">
      <div className="ambient-glow" aria-hidden="true" />
      <header className="app-header">
        <div className="brand">
          <span className="brand-kicker">Explorer App</span>
          <h1>Rick and Morty</h1>
        </div>
        <nav className="nav">
          <NavLink
            to="/characters"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Personajes
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Favoritos
          </NavLink>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
