import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary("");
    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setSummary("Error connecting to backend. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="header">
        <span className="tag">AI powered</span>
        <h1>Text Summarizer</h1>
        <p className="subtitle">paste anything — get the essence in seconds</p>
      </div>

      <div className="main-grid">
        <div className="panel left-panel">
          <label className="input-label">Your Text</label>
          <textarea
            className="input-box"
            placeholder="paste an article, paragraph, or any text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p className="char-count">{text.length} characters</p>
          <button
            className="summarize-btn"
            onClick={handleSummarize}
            disabled={loading}
          >
            {loading ? "summarizing ..." : "summarize"}
          </button>
        </div>

        <div className="panel right-panel">
          <span className="input-label">Summary</span>
          {summary ? (
            <p className="summary-text">{summary}</p>
          ) : (
            <div className="empty-state">
              <p>your summary will appear here 🌸</p>
            </div>
          )}
        </div>
      </div>

      <p className="byline">by Suhitha K</p>
    </div>
  );
}

export default App;