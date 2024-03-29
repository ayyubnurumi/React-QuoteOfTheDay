import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import "./index.css";

function App() {
  const [respData, setRespData] = useState("");
  const [fontSize, setFontSize] = useState("2.5rem");

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
      .then((response) => {
        setRespData(response.data);
        let fs = 2.5;
        for (let i = 0; i < response.data.content.length; i++) {
          fs -= 0.002;
        }
        setFontSize(fs+"rem")
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [current, setCurrent] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [shake, setShake] = useState(false);
  const [shakeThemeBtn, setShakeThemeBtn] = useState(false);

  const bgData = useMemo(() => require("./color.json"), []);

  useEffect(() => {
    const color = document.querySelector(":root");
    if (darkMode) {
      color.style.setProperty("--primary", bgData[current]["--primary"]);
      color.style.setProperty("--secondary", bgData[current]["--secondary"]);
    } else {
      color.style.setProperty("--primary", bgData[current]["--secondary"]);
      color.style.setProperty("--secondary", bgData[current]["--primary"]);
    }
  }, [current, bgData, darkMode]);

  if (current === bgData.length) setCurrent(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={() => setCurrent(current + 1)}>Quote of the Day</h1>
        <FontAwesomeIcon
          className="icon dark-mode"
          icon={darkMode ? faSun : faMoon}
          onMouseEnter={(e) => setShakeThemeBtn(true)}
          onMouseLeave={(e) => setShakeThemeBtn(false)}
          shake={shakeThemeBtn}
          onClick={() => setDarkMode(!darkMode)}
        />
      </header>
      <main>
        {respData && (
          <blockquote style={{fontSize: fontSize}}>
            "{respData && respData.content}"
            <small>
              {respData && respData.originator && respData.originator.name}
            </small>
          </blockquote>
        )}
      </main>
      <FontAwesomeIcon
        className="icon"
        onMouseEnter={(e) => setShake(true)}
        onMouseLeave={(e) => setShake(false)}
        shake={shake}
        icon={faCircleRight}
        onClick={fetchData}
      />
    </div>
  );
}

export default App;
