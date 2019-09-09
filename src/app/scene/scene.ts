import { IMapPart, Map } from '../map/map';
import { Camera } from './camera';
import { mapConfig } from './map-config';

export const type = ['black', 'gray', 'lightblue', 'red', 'brown'];

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

    // renderer.save();
    // let image;
    // map.all.forEach((mapPart: IMapPart) => {
    //   // Should be fixed;
    //   let startY = mapPart.y + mapPart.h;
    //   renderer.beginPath();
    //   if (mapPart.h === 1) {
    //     if (mapPart.w === 1) {
    //       renderer.drawImage(
    //         TilesSources[mapPart.type].lSingleTile.image,
    //         mapPart.x * mapConfig.gridSize,
    //         size.height - startY * mapConfig.gridSize,
    //         mapConfig.gridSize,
    //         mapConfig.gridSize
    //       );
    //     } else {
    //       for (let i = 0; i < mapPart.w; i++) {
    //         if (i === 0) {
    //           image = TilesSources[mapPart.type].lLeftTile.image;
    //         } else if (i === mapPart.w - 1) {
    //           image = TilesSources[mapPart.type].lRightTile.image;
    //         } else {
    //           image = TilesSources[mapPart.type].lMiddleTile.image;
    //         }
    //         renderer.drawImage(
    //           image,
    //           (mapPart.x + i) * mapConfig.gridSize,
    //           size.height - startY * mapConfig.gridSize,
    //           mapConfig.gridSize,
    //           mapConfig.gridSize
    //         );
    //       }
    //     }
    //   } else {
    //     for (let j = 0; j < mapPart.h; j++) {
    //       if (j === 0) {
    //         if (mapPart.w === 1) {
    //           renderer.drawImage(
    //             TilesSources[mapPart.type].hSingleTile.image,
    //             mapPart.x * mapConfig.gridSize,
    //             size.height - startY * mapConfig.gridSize,
    //             mapConfig.gridSize,
    //             mapConfig.gridSize
    //           );
    //         } else {
    //           for (let i = 0; i < mapPart.w; i++) {
    //             if (i === 0) {
    //               image = TilesSources[mapPart.type].hLeftTile.image;
    //             } else if (i === mapPart.w - 1) {
    //               image = TilesSources[mapPart.type].hRightTile.image;
    //             } else {
    //               image = TilesSources[mapPart.type].hMiddleTile.image;
    //             }
    //             renderer.drawImage(
    //               image,
    //               (mapPart.x + i) * mapConfig.gridSize,
    //               size.height - startY * mapConfig.gridSize,
    //               mapConfig.gridSize,
    //               mapConfig.gridSize
    //             );
    //           }
    //         }
    //       } else {
    //         for (let i = 0; i < mapPart.w; i++) {
    //           renderer.drawImage(
    //             TilesSources[mapPart.type].hFillTile.image,
    //             (mapPart.x + i) * mapConfig.gridSize,
    //             size.height - (startY - j) * mapConfig.gridSize,
    //             mapConfig.gridSize,
    //             mapConfig.gridSize
    //           );
    //         }
    //       }
    //     }
    //   }
    //   renderer.closePath();
    // });
    // renderer.restore();

    // Enemies
    // renderer.save();
    // map.all.enemies.forEach((enemy: any) => {
    //   let startY = enemy.start.y + 1;
    //   renderer.beginPath();
    //   renderer.drawImage(EnemiesSources[enemy.type][0].image,
    //     enemy.start.x * mapConfig.gridSize + 5, (size.height - startY * mapConfig.gridSize) + 5, EnemiesSources[enemy.type][0].width, EnemiesSources[enemy.type][0].height);
    //   renderer.closePath();
    // });
    // renderer.restore();
    //
    // // Stars
    // renderer.save();
    // map.all.stars.forEach((star: any) => {
    //   let startY = star.start.y + 1;
    //   renderer.beginPath();
    //   renderer.drawImage(StarsSources.star.image,
    //     star.start.x * mapConfig.gridSize + 8, (size.height - startY * mapConfig.gridSize) + 10, StarsSources.star.width, StarsSources.star.height);
    //   renderer.closePath();
    // });
    // renderer.restore();

    // Grid
    renderer.save();
    renderer.font = '12px serif';
    renderer.fillStyle = 'black';
    renderer.strokeStyle = 'black';
    renderer.lineWidth = .2;

    for (let i = 0; i <= map.size.y; i++) {
      renderer.beginPath();
      renderer.moveTo(0, size.height - i * mapConfig.gridSize);
      renderer.lineTo(map.size.x * mapConfig.gridSize, size.height - i * mapConfig.gridSize);
      renderer.stroke();
      if (!((i + 1) % 10)) {
        renderer.fillText((i + 1).toString(), 10, size.height - i * mapConfig.gridSize - 10);
      }
      renderer.closePath();
    }

    for (let j = 0; j <= map.size.x; j++) {
      renderer.beginPath();
      renderer.moveTo(j * mapConfig.gridSize, size.height - 0);
      renderer.lineTo(j * mapConfig.gridSize, size.height - map.size.y * mapConfig.gridSize);
      renderer.stroke();
      if (!((j + 1) % 10)) {
        renderer.fillText((j + 1).toString(), j * mapConfig.gridSize + 10, size.height - 10);
      }
      renderer.closePath();
    }
    renderer.restore();

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
