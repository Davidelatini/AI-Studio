import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";

const SYSTEM_PROMPT = "Rispondi sempre in modo conciso, diretto e professionale.";
const MODEL = "llama-3.1-8b-instant";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Ciao, sono qui per aiutarti. Cosa vuoi fare oggi?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isSending) return;

    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    const userMessage = { role: "user", content: text };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "API key mancante. Imposta NEXT_PUBLIC_GROQ_API_KEY."
        }
      ]);
      setIsSending(false);
      return;
    }

    try {
      const outgoing = [...messages, userMessage];
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...outgoing],
          temperature: 0.4
        })
      });

      const data = await res.json();

      if (!data.choices) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Errore API: ${JSON.stringify(data)}`
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.choices[0].message.content
          }
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Errore di connessione a Groq."
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Layout title="Chat" subtitle="Conversazioni rapide e risposte immediate">
      <div className="chat-shell">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
          {isSending && (
            <div className="message assistant">
              <div className="typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="input-area">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
            rows={3}
          />
          <button className="primary-btn" type="button" onClick={sendMessage}>
            Invia
          </button>
        </div>
        <div className="hint">Suggerimento: Shift + Enter per andare a capo</div>
      </div>
    </Layout>
  );
}
