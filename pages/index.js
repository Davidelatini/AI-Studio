import { Fragment, useMemo, useState } from "react";
import Link from "next/link";

const plansBase = [
  {
    key: "basic",
    name: "Basic",
    tagline: "Gratis per sempre",
    cta: "Registrati",
    popular: false,
    prices: { monthly: 0, yearly: 0 },
    perksTop: ["1 grafico per scheda", "2 indicatori per grafico", "Pubblicita"]
  },
  {
    key: "essential",
    name: "Essential",
    tagline: "Per partire seriamente",
    cta: "Prova gratis",
    popular: false,
    prices: { monthly: 14.95, yearly: 12.95 },
    perksTop: ["2 grafici per scheda", "5 indicatori per grafico", "Zero pubblicita"]
  },
  {
    key: "plus",
    name: "Plus",
    tagline: "Per multi timeframe",
    cta: "Prova gratis",
    popular: true,
    prices: { monthly: 29.95, yearly: 28.29 },
    perksTop: ["4 grafici per scheda", "10 indicatori per grafico", "Alert avanzati"]
  },
  {
    key: "premium",
    name: "Premium",
    tagline: "Per chi vive sui grafici",
    cta: "Prova gratis",
    popular: false,
    prices: { monthly: 59.95, yearly: 56.49 },
    perksTop: ["8 grafici per scheda", "25 indicatori per grafico", "Piu storico"]
  }
];

const compareRows = [
  {
    group: "Grafici",
    rows: [
      { label: "Grafici per scheda", values: { basic: "1", essential: "2", plus: "4", premium: "8" } },
      { label: "Indicatori per grafico", values: { basic: "2", essential: "5", plus: "10", premium: "25" } },
      { label: "Alert di prezzo", values: { basic: "5", essential: "20", plus: "100", premium: "400" } }
    ]
  },
  {
    group: "Esperienza",
    rows: [
      { label: "Pubblicita", values: { basic: "Si", essential: "No", plus: "No", premium: "No" } },
      { label: "Bar Replay", values: { basic: "No", essential: "Si", plus: "Si", premium: "Si" } },
      { label: "Esporta dati", values: { basic: "No", essential: "Si", plus: "Si", premium: "Si" } }
    ]
  }
];

function formatPrice(value) {
  if (value === 0) return "0 EUR";
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2
  }).format(value);
}

export default function PricingPage() {
  const [billing, setBilling] = useState("yearly");
  const plans = useMemo(() => plansBase, []);

  return (
    <div className="pricing-page">
      <header className="pricing-header">
        <div className="pricing-nav">
          <div className="pricing-brand">
            <div className="pricing-mark">AI</div>
            <div>
              <div className="pricing-title">AI Studio</div>
              <div className="pricing-subtitle">Pricing chiaro e rapido</div>
            </div>
          </div>
          <nav className="pricing-links">
            <a href="#piani">Piani</a>
            <a href="#confronto">Confronto</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="pricing-cta">
            <Link href="/aistudio" className="secondary-btn">
              Apri AI Studio
            </Link>
            <button className="primary-btn" type="button">
              Inizia ora
            </button>
          </div>
        </div>
      </header>

      <main className="pricing-main">
        <section className="pricing-hero">
          <div className="pricing-hero-glow" aria-hidden="true" />
          <div className="pricing-hero-grid">
            <div className="pricing-hero-copy">
              <span className="pricing-eyebrow">Decisioni rapide, zero rumore</span>
              <h1>Prezzi chiari, UI coerente con il tuo AI Studio.</h1>
              <p>
                La struttura resta quella della pagina pricing, ma il look parla lo stesso linguaggio:
                luce calda, superfici morbide e una gerarchia che guida al click.
              </p>
            </div>
            <div className="pricing-billing">
              <div className="billing-toggle">
                <button
                  type="button"
                  className={billing === "monthly" ? "active" : ""}
                  onClick={() => setBilling("monthly")}
                >
                  Mensile
                </button>
                <button
                  type="button"
                  className={billing === "yearly" ? "active" : ""}
                  onClick={() => setBilling("yearly")}
                >
                  Annuale
                </button>
              </div>
              <p>Consiglio: annuale per sbloccare il valore migliore.</p>
            </div>
          </div>
        </section>

        <section id="piani" className="pricing-plans">
          <div className="plans-grid">
            {plans.map((plan) => {
              const price = plan.prices[billing];
              const isFree = price === 0;
              const highlight = plan.popular;

              return (
                <article key={plan.key} className={`plan-card ${highlight ? "highlight" : ""}`}>
                  {highlight && <span className="plan-badge">Consigliato</span>}
                  <h3>{plan.name}</h3>
                  <p className="plan-tagline">{plan.tagline}</p>
                  <div className="plan-price">
                    <span className="price-main">{formatPrice(price)}</span>
                    {!isFree && <span className="price-sub">/ mese</span>}
                  </div>
                  <button className={highlight ? "primary-btn" : "secondary-btn"} type="button">
                    {plan.cta}
                  </button>
                  <ul className="plan-perks">
                    {plan.perksTop.map((perk) => (
                      <li key={perk}>
                        <span className="perk-dot" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <div className="plan-orb" aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </section>

        <section id="confronto" className="pricing-compare">
          <div className="compare-header">
            <div>
              <h2>Confronta i piani</h2>
              <p>
                Una matrice leggibile con categorie, etichette brevi e la prima colonna sempre visibile.
              </p>
            </div>
          </div>
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="sticky-col">Caratteristica</th>
                  {plans.map((plan) => (
                    <th key={plan.key} className={plan.popular ? "highlight" : ""}>
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((group) => (
                  <Fragment key={group.group}>
                    <tr className="compare-group">
                      <td colSpan={plans.length + 1}>{group.group}</td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.label}>
                        <td className="sticky-col">{row.label}</td>
                        {plans.map((plan) => (
                          <td key={plan.key} className={plan.popular ? "highlight" : ""}>
                            {row.values[plan.key] ?? "N/A"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="faq" className="pricing-faq">
          <div className="faq-card">
            <h3>Cosa rende la pagina efficace?</h3>
            <p>
              Poche decisioni visive ripetute bene: griglia pulita, spaziature coerenti, testi brevi e
              pulsanti chiari.
            </p>
          </div>
          <div className="faq-card">
            <h3>Come la rendo piu simile ad AI Studio?</h3>
            <p>
              Usa superfici soft, glow caldi, gradienti controllati e un accento arancio per i CTA.
            </p>
          </div>
        </section>
      </main>

      <footer className="pricing-footer">
        <p>Demo UI - sostituisci copy, prezzi e feature con i tuoi.</p>
      </footer>
    </div>
  );
}
