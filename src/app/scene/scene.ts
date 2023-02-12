import { IMapPart, Map } from '../map/map';
import { Camera } from './camera';
import { mapConfig } from './map-config';
import { renderGrid } from './grid';
import { Vector } from '../libs/vector';

export const type = ['black', 'gray', 'lightblue', 'red', 'brown', 'green', 'pink', 'orange', 'darkblue'];

export class Scene {
  constructor() {}

  static render(renderer: CanvasRenderingContext2D, size: any, camera: Camera, map: Map, interaction: any) {
    renderer.fillStyle = 'whitesmoke';
    renderer.fillRect(0, 0, size.width, size.height);

    renderer.save();
    camera.render(renderer, size);
    let fromX, toX, fromY, toY;

    // Highlight
    if (interaction.pressed && !interaction.addMovableObject) {
      renderer.save();
      renderer.fillStyle = type[interaction.action.subType];
      fromX = (interaction.current.x >= interaction.start.x ? interaction.start.x : interaction.current.x);
      toX = (interaction.current.x >= interaction.start.x ? interaction.current.x : interaction.start.x);
      fromY = (interaction.current.y >= interaction.start.y ? interaction.start.y : interaction.current.y);
      toY = (interaction.current.y >= interaction.start.y ? interaction.current.y : interaction.start.y);
      for (let i = fromX; i <= toX; i++) {
        for (let j = fromY; j <= toY; j++) {
          renderer.beginPath();
          renderer.fillRect(i * mapConfig.gridSize, size.height - (j + 1) * mapConfig.gridSize, mapConfig.gridSize, mapConfig.gridSize);
          renderer.fill();
          renderer.closePath();
        }
      }
      renderer.restore();
    }

    // Map
    renderer.save();
    map.all.forEach((mapPart: IMapPart) => {
      renderer.beginPath();
      renderer.fillStyle = type[mapPart.type];
      renderer.fillRect(
          mapPart.x * mapConfig.gridSize,
          size.height - (mapPart.y + mapPart.h) * mapConfig.gridSize,
          mapPart.w * mapConfig.gridSize,
          mapPart.h * mapConfig.gridSize);
      renderer.closePath();

      if (mapPart.d) {
        renderer.beginPath();
        renderer.globalAlpha = .5;
        renderer.fillStyle = type[mapPart.type];
        renderer.fillRect(
            (mapPart.x + mapPart.d.x) * mapConfig.gridSize,
            size.height - ((mapPart.y + mapPart.d.y) + mapPart.h) * mapConfig.gridSize,
            mapPart.w * mapConfig.gridSize,
            mapPart.h * mapConfig.gridSize);
        renderer.closePath();

        renderer.beginPath();
        renderer.strokeStyle = 'black';
        renderer.moveTo(mapPart.x * mapConfig.gridSize + (mapPart.w * mapConfig.gridSize / 2),
            size.height - (mapPart.y + mapPart.h) * mapConfig.gridSize + (mapPart.h * mapConfig.gridSize) / 2);
        renderer.lineTo((mapPart.x + mapPart.d.x) * mapConfig.gridSize + (mapPart.w * mapConfig.gridSize / 2),
            size.height - ((mapPart.y + mapPart.d.y) + mapPart.h) * mapConfig.gridSize + (mapPart.h * mapConfig.gridSize) / 2);
        renderer.stroke();
        renderer.closePath();

        renderer.globalAlpha = 1;

      }
    });
    renderer.restore();

    // Grid
    renderGrid(renderer, new Vector(map.size.x, map.size.y), new Vector(size.width, size.height), mapConfig.gridSize);

    // Hint;
    renderer.save();
    renderer.globalAlpha = .3;
    renderer.translate(
      interaction.current.x * mapConfig.gridSize,
      size.height - interaction.current.y * mapConfig.gridSize);
    renderer.beginPath();
    if (interaction.action.type === 0) {
      renderer.fillStyle = type[interaction.action.subType];
      renderer.fillRect(0, -mapConfig.gridSize, mapConfig.gridSize, mapConfig.gridSize);
    }
    // if (interaction.action.type === 1) {
    //   renderer.drawImage(EnemiesSources[interaction.action.subType][0].image,
    //     5, -mapConfig.gridSize + 5,
    //     EnemiesSources[interaction.action.subType][0].width,
    //     EnemiesSources[interaction.action.subType][0].height);
    // }
    // if (interaction.action.type === 2) {
    //   renderer.drawImage(StarsSources.star.image,
    //     8, -mapConfig.gridSize + 10,
    //     StarsSources.star.width,
    //     StarsSources.star.height);
    // }
    renderer.closePath();
    renderer.restore();


    renderer.restore();
  }
}
