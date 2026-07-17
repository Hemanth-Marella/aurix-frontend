import React, { useState } from "react";
import "../styles/title-container.css";
import { uploadPdf, userQuestion,summary} from "../api/serverwrapper";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const [file_hash,setFile_hash] = useState("");
  const [chapter_name,setChapter_name] = useState("");

  // console.log("chapter name is : ", chapter_name);


  const handleSummary = async () => {
    if (!file){
      alert("please select a pdf");
      return;
    }

    try{
      const result = await summary(chapter_name);

      setAnswer(result.summary)
    }catch (error) {
      console.error(error);
      setAnswer("Failed to fetch summary.");
    }
  }

  const handleAsk = async () => {
    if (!question.trim()) return;

    setAnswer("");

    try {
      const stream = await userQuestion(question,file_hash);

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setAnswer((prev) => prev + chunk);
      }
    } catch (error) {
      console.error(error);
      setAnswer("Failed to get answer.");
    }
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

      if (result.status === "duplicate") {
        setFile_hash(result.file_hash);
        setChapter_name(result.chapter_name);
        alert("This PDF has already been uploaded.");
      } else if (result.status === "uploaded") {
        setFile_hash(result.file_hash);
        setChapter_name(result.chapter_name);
        alert("Upload successful.");
      } else {
        alert("Unknown response.");
      }
      // // Change according to your API response
      // alert(result.message || JSON.stringify(result));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload PDF.");
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

        <button  onClick={handleUpload} className="upload-pdf">
          Upload
        </button>
      </div>

      <div className="summary_button">
        <button onClick = {handleSummary}>
          Summary
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