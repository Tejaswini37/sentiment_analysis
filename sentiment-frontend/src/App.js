import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return alert("Please enter some text!");
    try {
      const response = await axios.post("http://localhost:5000/predict", { text });
      setResult(response.data.prediction);
    } catch (error) {
      setResult("Error connecting to the server.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧠 Sentiment Analysis</h1>
      <textarea
        style={styles.textarea}
        rows="4"
        placeholder="Enter text to analyze..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button style={styles.button} onClick={handleSubmit}>
        Analyze
      </button>
      {result && <h3 style={styles.result}>Sentiment: <span>{result}</span></h3>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "60px auto",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#333"
  },
  textarea: {
    width: "100%",
    padding: "1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "none",
    outline: "none",
    marginBottom: "1rem"
  },
  button: {
    padding: "0.7rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s"
  },
  result: {
    marginTop: "1.5rem",
    color: "#333",
    fontSize: "1.2rem"
  }
};

export default App;
