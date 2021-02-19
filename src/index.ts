import { App } from './app/app';

const gameOutputRef = document.getElementById('game-output');

if (gameOutputRef) {
  (window as any).app = new App(gameOutputRef);

  const controls = document.getElementsByClassName('control');

  document.getElementById('controls').addEventListener('mousedown', (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const id = (event.target as any).id;
    if (id) {
      for (let i = 0; i < controls.length; i++) {
        controls[i].classList.remove('active');
      }

      (event.target as any).classList.add('active');
      (window as any).app.setAction(+id);
    }
  }, false);

} else {
  console.log('No output container for game rendering. You should have a <div id="game-output"></div> inside your html.');
}
