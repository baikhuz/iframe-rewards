import { useState, useEffect } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIframeUrl(url);
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === "http://localhost:5173") return;
      const message =
        typeof event.data === "string"
          ? event.data
          : JSON.stringify(event.data);

      console.log(event.data);

      setMessages((prevMessages) => [...prevMessages, message]);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Load URL</button>
      </form>
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          style={{ width: "100%", height: "70vh", border: "none" }}
          title="Loaded iframe"
        />
      )}
      <div>
        <h3>Messages:</h3>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
