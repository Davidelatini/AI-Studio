import Layout from "../components/Layout";

export default function NotePage() {
  return (
    <Layout title="Note" subtitle="Idee, appunti e ispirazioni in ordine">
      <div className="grid-two">
        <div className="panel">
          <h3>Nuova nota</h3>
          <p>Scrivi un titolo, aggiungi tag e salva ogni idea al volo.</p>
          <div className="pill-row">
            <span className="pill">Idea</span>
            <span className="pill">Meeting</span>
            <span className="pill">Progetto</span>
          </div>
        </div>
        <div className="panel">
          <h3>Archivio veloce</h3>
          <p>Ritrova subito le note con un layout compatto e visivo.</p>
          <button className="ghost-btn" type="button">
            Esplora note
          </button>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h4>Roadmap Q1</h4>
          <p>Milestone e priorita del primo trimestre gia pronte.</p>
        </div>
        <div className="card">
          <h4>Brief creativo</h4>
          <p>Linee guida e tone of voice per la prossima campagna.</p>
        </div>
        <div className="card">
          <h4>Retro note</h4>
          <p>Insight raccolti e prossimi miglioramenti suggeriti.</p>
        </div>
      </div>
    </Layout>
  );
}
