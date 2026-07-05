import React, { useState } from "react";
import "../styles/title-container.css";
import { uploadPdf } from "../api/serverwrapper";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);

  const handleAsk = () => {
    if (question.trim() === "") return;

    // Replace with your question API later
    setAnswer(`You asked: "${question}"`);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    try {
      const result = await uploadPdf(file);

      console.log("Uploaded file:", file);
      console.log("Server response:", result);

      // Change according to your API response
      setAnswer(result.message || JSON.stringify(result));
    } catch (error) {
      console.error("Upload failed:", error);
      setAnswer("Failed to upload PDF.");
    }
  };

  return (
    <div className="page-container">
      {/* Upload Section */}
      <div className="file-container">
        <label className="upload-btn">
          Choose PDF
          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && <span className="file-name">{file.name}</span>}

        <button onClick={handleUpload}>
          Upload
        </button>
      </div>

      {/* Title */}
      <div className="title-container">
        <h1 className="page-title">Aurix Learn</h1>
        <h2 className="sub-title">Ask. Learn. Understand.</h2>
      </div>

      {/* Answer */}
      <div className="answer-container">
        {answer ? (
          <p>{answer}</p>
        ) : (
          <p className="placeholder">
            Your answer will appear here...
          </p>
        )}
      </div>

      {/* Question */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAsk();
            }
          }}
        />

        <button onClick={handleAsk}>
          Ask
        </button>
      </div>
    </div>
  );
}