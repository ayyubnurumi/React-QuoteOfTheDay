import axios from "axios";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";

function App() {
  const [respData, setRespData] = useState("");

  const fetchData = useCallback(() => {
    axios({
      method: "GET",
      url: "https://quotes15.p.rapidapi.com/quotes/random/",
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      },
      params: { language_code: "en" },
    })
      .then((response) => setRespData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [current, setCurrent] = useState(0);

  const bgData = useMemo(() => [
    { "--primary": "#191641", "--secondary": "#fafafa" },
    { "--primary": "#478a90", "--secondary": "#faf8f9" },
    { "--primary": "#00512e", "--secondary": "#ce9f69" },
    { "--primary": "#4f326a", "--secondary": "#e3a9c0" },
    { "--primary": "#9878b7", "--secondary": "#f9edfd" },
    { "--primary": "#55bab9", "--secondary": "#f7ecde" },
    { "--primary": "#9dad7f", "--secondary": "#f7f7e8" },
    { "--primary": "#79d1c3", "--secondary": "#f8fcfb" },
    { "--primary": "#4f3541", "--secondary": "#ffcbcb" },
    { "--primary": "#3a5245", "--secondary": "#f0ebce" },
    { "--primary": "#3b3946", "--secondary": "#f7ccac" },
    { "--primary": "#874d63", "--secondary": "#f2d388" },
    { "--primary": "#97bfb4", "--secondary": "#f5eedc" },
    { "--primary": "#5e5c6b", "--secondary": "#f5cdaa" },
    { "--primary": "#07081a", "--secondary": "#6e7b8c" },
    { "--primary": "#635c4c", "--secondary": "#b5a98f" },
    { "--primary": "#0f3935", "--secondary": "#e19a1c" },
  ], []);

  useEffect(() => {
    const color = document.querySelector(":root");
    console.log(bgData[current]);
    color.style.setProperty("--primary", bgData[current]["--primary"]);
    color.style.setProperty("--secondary", bgData[current]["--secondary"]);
  }, [current, bgData]);
  
  if (current === bgData.length) setCurrent(0);

  return (
    <div className="App">
      <header className="App-header" onClick={() => setCurrent(current + 1)}>
        <h1>Quote of the Day</h1>
      </header>
      <main>
        {respData && (
          <blockquote>
            "{respData && respData.content}"
            <small>
              {respData && respData.originator && respData.originator.name}
            </small>
          </blockquote>
        )}
      </main>
      <button onClick={fetchData}>Get Quote</button>
    </div>
  );
}

export default App;
