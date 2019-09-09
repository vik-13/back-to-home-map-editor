import { App } from './app/app';

const gameOutputRef = document.getElementById('game-output');

if (gameOutputRef) {
  const app = new App(gameOutputRef);
} else {
  console.log('No output container for game rendering. You should have a <div id="game-output"></div> inside your html.');
}
