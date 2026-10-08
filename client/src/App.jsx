import { useState } from "react";

export default function App() {

const [messages, setMessages] = useState([]);

const [text, setText] = useState("");

const [busy, setBusy] = useState(false);

async function send() {

if (!text.trim()) return;

const next = [...messages,

{ role: "user", content: text }];

setMessages(next); setText(""); setBusy(true);

const r = await fetch(

`${import.meta.env.VITE_API_URL}/chat`, {

method: "POST",

headers: { "Content-Type": "application/json" },

body: JSON.stringify({ messages: next }),

});

const { reply } = await r.json();

setMessages([...next,

{ role: "assistant", content: reply }]);

setBusy(false);

}

const B = { padding: "12px 16px", borderRadius: 16, maxWidth: "75%" };

return (

<div style={{ maxWidth: 620, margin: "0 auto", height: "100vh",

display: "flex", flexDirection: "column", padding: 24 }}>

<h1 style={{ fontSize: 20, margin: "0 0 16px" }}>Group Chatbot</h1>

{/* scrolling message area */}

<div style={{ flex: 1, overflowY: "auto", display: "flex",

flexDirection: "column", gap: 12 }}>

{messages.map((m, i) => (

<div key={i} style={{ ...B,

alignSelf: m.role === "user" ? "flex-end" : "flex-start",

background: m.role === "user" ? "#0f766e" : "#f1f5f9",

color: m.role === "user" ? "#fff" : "#0b1c30" }}>

{m.content}</div>))}

{busy && <div style={{ ...B, background: "#f1f5f9",

alignSelf: "flex-start", color: "#6b7280" }}>Typing...</div>}

</div>

{/* input row — Enter sends too */}

<div style={{ display: "flex", gap: 8, paddingTop: 16 }}>

<input value={text} placeholder="Type a message..."

onChange={(e) => setText(e.target.value)}

onKeyDown={(e) => e.key === "Enter" && send()}

style={{ flex: 1, padding: "12px 14px", fontSize: 15,

border: "1px solid #cbd5e1", borderRadius: 10 }} />

<button onClick={send} disabled={busy || !text.trim()}

style={{ padding: "12px 20px", fontSize: 15, border: 0,

borderRadius: 10, background: "#0f766e", color: "#fff",

opacity: busy || !text.trim() ? 0.5 : 1 }}>Send</button>

</div>

</div>);

}