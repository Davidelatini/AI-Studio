import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Pricing" },
  { href: "/aistudio", label: "AI Studio" },
  { href: "/home", label: "Home" },
  { href: "/note", label: "Note" },
  { href: "/todo", label: "Todo" }
];

export default function Layout({ title, subtitle, children }) {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeLabel = mounted ? (theme === "light" ? "Night" : "Day") : "Theme";

  return (
    <>
      <Head>
        <title>{title} - AI Assistant</title>
      </Head>
      <div className="page ai-studio">
        <div className="background-orb" aria-hidden="true" />
        <div className="background-orb orb-two" aria-hidden="true" />
        <div className="app-shell">
          <aside className="sidebar">
            <div className="brand">
              <div className="brand-mark">AI</div>
              <div>
                <div className="brand-title">AI Studio</div>
                <div className="brand-subtitle">Workspace moderno</div>
              </div>
            </div>
            <nav className="nav">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${router.pathname === link.href ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="sidebar-card">
              <div className="sidebar-card-title">Quick tips</div>
              <p className="sidebar-card-text">
                Usa la chat per idee rapide, note e check-list senza cambiare pagina.
              </p>
              <div className="pill-row">
                <span className="pill">Live</span>
                <span className="pill">Sync</span>
                <span className="pill">Flow</span>
              </div>
            </div>
          </aside>

          <section className="content">
            <header className="page-header">
              <div>
                <span className="eyebrow">AI Assistant</span>
                <h1>{title}</h1>
                <p>{subtitle}</p>
              </div>
              <div className="header-actions">
                <div className="status-pill">
                  <span className="status-dot" /> Online
                </div>
                <button className="theme-toggle" type="button" onClick={toggleTheme}>
                  {themeLabel}
                </button>
              </div>
            </header>

            <div className="content-body">{children}</div>
          </section>
        </div>
      </div>
    </>
  );
}
