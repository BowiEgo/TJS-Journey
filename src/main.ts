import "./style.css";
// import { initBasicScene } from "./basicScene.ts";
import { initHauntedHouseScene } from "./hauntedHouseScene.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas class="webgl"></canvas>
`;

// initBasicScene();
initHauntedHouseScene();
