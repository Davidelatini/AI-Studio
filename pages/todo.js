import Layout from "../components/Layout";

export default function TodoPage() {
  return (
    <Layout title="Todo" subtitle="Task e priorita sempre sotto controllo">
      <div className="panel">
        <h3>Oggi</h3>
        <p>Una lista chiara per mantenere il focus sui task chiave.</p>
        <div className="todo-list">
          <div className="todo-item">
            <span className="todo-check" />
            <div>
              <div className="todo-title">Definire obiettivi sprint</div>
              <div className="todo-meta">Prima della riunione 10:30</div>
            </div>
            <span className="pill">High</span>
          </div>
          <div className="todo-item">
            <span className="todo-check" />
            <div>
              <div className="todo-title">Rivedere backlog</div>
              <div className="todo-meta">Allineare priorita con team</div>
            </div>
            <span className="pill">Medium</span>
          </div>
          <div className="todo-item">
            <span className="todo-check" />
            <div>
              <div className="todo-title">Inviare recap</div>
              <div className="todo-meta">Condividere note entro le 18:00</div>
            </div>
            <span className="pill">Low</span>
          </div>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h4>In arrivo</h4>
          <p>Pianifica la settimana con promemoria e scadenze rapide.</p>
        </div>
        <div className="card">
          <h4>In attesa</h4>
          <p>Task bloccati che richiedono input o conferme.</p>
        </div>
      </div>
    </Layout>
  );
}
