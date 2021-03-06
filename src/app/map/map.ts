import { Vector } from '../libs/vector';

export class MapPart implements IMapPart {
  constructor(public type = 0, public x: number, public y: number, public w: number, public h: number) {}
}

export interface IMapPart {
  type: number,
  x: number,
  y: number,
  w: number,
  h: number,
  d?: Vector
}

export class Map {
  all: any[] = [];
  size = {
    x: 100,
    y: 50
  };

  constructor() {
    const source = localStorage.getItem('lastMap');
    if (source) {
      this.inject(source);
    }
  }

  getMap() {
    return this.all.map((item) => {
      const block = [item.type, item.x, item.y, item.w, item.h];
      if (item.d) {
        block.push(item.d.x);
        block.push(item.d.y);
      }
      return block;
    });
  }

  inject(source: any) {
    const tempMap = typeof source === 'string' ? JSON.parse(source) : source || [];
    this.all = tempMap.map((item: any) => {
      const block: IMapPart = new MapPart(item[0], item[1], item[2],item[3], item[4]);
      if (typeof item[5] !== 'undefined') {
        block.d = new Vector(item[5], item[6]);
      }
      return block;
    });
  };

  reset() {
    this.all.length = 0;
    // this.all.enemies.length = 0;
    // this.all.stars.length = 0;
    localStorage.removeItem('lastMap');
  }

  add(interaction: any) {
    let fromX = (interaction.current.x >= interaction.start.x ? interaction.start.x : interaction.current.x);
    let fromY = (interaction.current.y <= interaction.start.y ? interaction.start.y : interaction.current.y);
    let toX = (interaction.current.x >= interaction.start.x ? interaction.current.x : interaction.start.x);
    let toY = (interaction.current.y <= interaction.start.y ? interaction.current.y : interaction.start.y);
    this.all.push(new MapPart(interaction.action.subType, fromX, toY,toX - fromX + 1,  fromY - toY + 1));
    localStorage.setItem('lastMap', JSON.stringify(this.getMap()));
  }

  makeItMovable(interaction: any) {
    let selected: any = null;
    this.all.forEach((mapPart: MapPart) => {
      if (mapPart.x <= interaction.start.x &&
          mapPart.x + mapPart.w > interaction.start.x &&
          mapPart.y <= interaction.start.y &&
          mapPart.y + mapPart.h > interaction.start.y) {
        selected = mapPart;
      }
    });
    if (!selected) return;

    selected.d = new Vector(interaction.end.x - interaction.start.x, interaction.end.y - interaction.start.y);
    localStorage.setItem('lastMap', JSON.stringify(this.getMap()));
  }

  addEnemy(coords: any, type: number = 0) {
    // let found = false;
    // this.all.enemies.forEach((mapPart: MapPart) => {
    //   if (mapPart.start.x === coords.x && mapPart.start.y === coords.y) {
    //     found = true;
    //   }
    // });
    // if (!found) {
    //   this.all.enemies.push({
    //     type: type,
    //     start: new Vector(coords.x, coords.y),
    //     size: new Vector(1, 1)
    //   });
    //   localStorage.setItem('lastMap', JSON.stringify(this.all));
    // }
  }

  addStar(coords: any) {
    // let found = false;
    // this.all.enemies.forEach((mapPart: MapPart) => {
    //   if (mapPart.start.x === coords.x && mapPart.start.y === coords.y) {
    //     found = true;
    //   }
    // });
    // if (!found) {
    //   this.all.stars.push({
    //     type: 0,
    //     start: new Vector(coords.x, coords.y),
    //     size: new Vector(1, 1)
    //   });
    //   localStorage.setItem('lastMap', JSON.stringify(this.all));
    // }
  }

  check(coords: any) {

  }

  remove(coords: any) {
    let toRemove: any = null;
    this.all.forEach((mapPart: MapPart) => {
      if (mapPart.x <= coords.x &&
        mapPart.x + mapPart.w > coords.x &&
        mapPart.y <= coords.y &&
        mapPart.y + mapPart.h > coords.y) {
        toRemove = mapPart;
      }
    });
    if (toRemove) {
      this.all.splice(this.all.indexOf(toRemove), 1);
      localStorage.setItem('lastMap', JSON.stringify(this.getMap()));
    }
    // if (!toRemove) {
    //   this.all.enemies.forEach((mapPart: MapPart) => {
    //     if (mapPart.x === coords.x && mapPart.y === coords.y) {
    //       toRemove = mapPart;
    //     }
    //   });
    //   if (toRemove) {
    //     this.all.enemies.splice(this.all.enemies.indexOf(toRemove), 1);
    //     localStorage.setItem('lastMap', JSON.stringify(this.all));
    //   }
    // }
    // if (!toRemove) {
    //   this.all.stars.forEach((mapPart: MapPart) => {
    //     if (mapPart.x === coords.x && mapPart.y === coords.y) {
    //       toRemove = mapPart;
    //     }
    //   });
    //   if (toRemove) {
    //     this.all.stars.splice(this.all.stars.indexOf(toRemove), 1);
    //     localStorage.setItem('lastMap', JSON.stringify(this.all));
    //   }
    // }
  }
}
