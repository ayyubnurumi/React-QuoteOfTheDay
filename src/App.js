import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const [respData, setRespData] = useState("");
  
  const fetchData = useCallback(
    () => {
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
    },
    [],
  )
  
  useEffect(() => {fetchData()
    // setRespData('hello')
    // console.log(respData);
  }, [fetchData]);

  return (
    <div className="App">
      <header className="App-header">
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
      {/* <pre>
        <code>{respData && JSON.stringify(respData, null, 4)}</code>
      </pre> */}
    </div>
  );
}

export default App;
