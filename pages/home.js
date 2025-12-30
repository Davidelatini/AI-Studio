import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout title="Home" subtitle="Panoramica rapida per iniziare">
      <div className="grid-two">
        <div className="panel">
          <h3>Panoramica</h3>
          <p>Un colpo d occhio su chat, note e task in corso.</p>
          <div className="stats">
            <div className="stat">
              <div className="stat-label">Sessioni</div>
              <div className="stat-value">24</div>
            </div>
            <div className="stat">
              <div className="stat-label">Note attive</div>
              <div className="stat-value">8</div>
            </div>
            <div className="stat">
              <div className="stat-label">Task oggi</div>
              <div className="stat-value">5</div>
            </div>
          </div>
        </div>
        <div className="panel accent">
          <h3>Focus del giorno</h3>
          <p>Allinea priorita, idee e prossime azioni in uno spazio unico.</p>
          <button className="ghost-btn" type="button">
            Apri briefing
          </button>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h4>Chat Express</h4>
          <p>Richieste veloci, brainstorming e supporto istantaneo.</p>
        </div>
        <div className="card">
          <h4>Note creative</h4>
          <p>Colleziona insight, bozze e decisioni in un layout pulito.</p>
        </div>
        <div className="card">
          <h4>Todo smart</h4>
          <p>Priorita chiare con blocchi rapidi per oggi e domani.</p>
        </div>
      </div>
    </Layout>
  );
}
