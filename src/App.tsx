import './App.css'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "/src/game/game.js";
    script.async = true;
    script.type = "module";

    document.body.appendChild(script);
  });
  return (
    <>
      <canvas id="game-screen"></canvas>
    </>
  )
}

export default App
