export class Map {
  currentVersion = 0.2;
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

  inject(source: any) {
    const data = typeof source === 'string' ? JSON.parse(source) : source || {};
    if (data.version === this.currentVersion) {
      this.all = [];
      // TODO: Should be removed soon;
      data.size = data.size ? data.size : 100;
    } else if (data.version === 0.1) {
      // TODO: do something with old maps;
    } else {
      console.log('[Map loader] You have old version of map or empty map. It cannot be loaded;');
      this.all = []
    }
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
    console.log(fromX, toY, toX - fromX + 1, fromY - toY + 1);
    this.all.push(new MapPart(interaction.action.subType, fromX, toY,toX - fromX + 1,  fromY - toY + 1));
    localStorage.setItem('lastMap', JSON.stringify(this.all));
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
        mapPart.y >= coords.y &&
        mapPart.y - mapPart.h < coords.y) {
        toRemove = mapPart;
      }
    });
    if (toRemove) {
      this.all.splice(this.all.indexOf(toRemove), 1);
      localStorage.setItem('lastMap', JSON.stringify(this.all));
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

export class MapPart implements IMapPart {
  constructor(public type = 0, public x: number, public y: number, public w: number, public h: number) {}
}

export interface IMapPart {
  type: number,
  x: number,
  y: number,
  w: number,
  h: number
}
