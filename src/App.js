import Button from "./components/Button";
import React, { useEffect, useContext } from "react";
import "./App.css";
import SetPomodoro from "./components/SetPomodoro";
import CountdownAnimation from "./components/CountdownAnimation";
import { SettingsContext } from "./context/SettingsContext";

function App() {
  const {
    pomodoro,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingBtn,
  } = useContext(SettingsContext);

  useEffect(() => {
    updateExecute(executing);
  }, [executing, startAnimate]);

  return (
    <div className="container">
      <h1>Outco Pomodoro Timer</h1>
      <small>The left dial is for the amount of time you'd like to focus</small>
      <small>Set the middle dial is for your short breaks</small>
      <small>Set the right dial for your long breaks</small>
      {pomodoro !== 0 ? (
        <>
          <ul className="labels">
            <li>
              <Button
                title="Work"
                activeClass={
                  executing.active === "work" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("work")}
              />
            </li>
            <li>
              <Button
                title="Short Break"
                activeClass={
                  executing.active === "short" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("short")}
              />
            </li>
            <li>
              <Button
                title="Long Break"
                activeClass={
                  executing.active === "long" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("long")}
              />
            </li>
          </ul>
          <Button title="Settings" _callback={SettingBtn} />
          <div className="timer-container">
            <div className="time-wrapper">
              <CountdownAnimation
                key={pomodoro}
                timer={pomodoro}
                animate={startAnimate}
              >
                {children}
              </CountdownAnimation>
            </div>
          </div>
          <div className="button-wrapper">
            <Button
              title="Start"
              className={!startAnimate ? "active" : undefined}
              _callback={startTimer}
            />
            <Button
              title="Pause"
              className={startAnimate ? "active" : undefined}
              _callback={pauseTimer}
            />
          </div>
        </>
      ) : (
        <SetPomodoro />
      )}
    </div>
  );
}

export default App;
