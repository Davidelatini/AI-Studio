const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const themeToggle = document.getElementById("themeToggle");

const THEME_KEY = "theme";

function applyTheme(theme) {
  const isDay = theme === "day";
  document.body.classList.toggle("day", isDay);
  themeToggle.textContent = isDay ? "Notte" : "Diurno";
  themeToggle.setAttribute("aria-pressed", isDay.toString());
}

const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === "day" ? "day" : "dark");

// ✅ INSERISCI QUI LA TUA API KEY GROQ
const GROQ_API_KEY = "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";

function add(text, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  add(text, "user");
  input.value = "";

  const botDiv = add("", "bot");

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "Rispondi sempre in modo conciso, diretto e professionale."
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.4
      })
    });

    const data = await res.json();

    if (!data.choices) {
      botDiv.textContent = "❌ Errore API: " + JSON.stringify(data);
      return;
    }

    botDiv.textContent = data.choices[0].message.content;

  } catch (e) {
    botDiv.textContent = "❌ Errore di connessione a Groq";
  }
}

sendBtn.addEventListener("click", send);

input.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send();
  }
});

themeToggle.addEventListener("click", () => {
  const next = document.body.classList.contains("day") ? "dark" : "day";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});
