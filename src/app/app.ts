import { Scene } from './scene/scene';
import { Map } from './map/map';
import { Camera } from './scene/camera';
import { Vector } from './libs/vector';

export class App {
  rendererRef = document.createElement('canvas');
  renderer = this.rendererRef.getContext('2d');
  map: Map;
  camera: Camera;
  interaction = {
    action: {
      type: 0, // 0 - walls, 1 - enemies; 2- stars;
      subType: 0 // 0, 1
    },
    start: new Vector(),
    current: new Vector(),
    end: new Vector(),
    pressed: false,
    left: false,
    right: false,
    up: false,
    down: false,
    addMovableObject: false
  };
  size = {
    width: 0,
    height: 0
  };

  constructor(container: Node) {
    container.appendChild(this.rendererRef);
    this.handleSize();

    this.camera = new Camera();
    this.map = new Map();

    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.addEventListener('mouseleave', this.handleMouseUp.bind(this));

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    document.addEventListener('mousemove', this.mousemove.bind(this));
    document.addEventListener('contextmenu', this.contextMenu.bind(this));

    window.addEventListener('resize', () => {
      this.handleSize();
    });
    window.addEventListener('load', () => {
      this.liveCycle();
    });

    document.addEventListener('copy', this.copy.bind(this));

    document.addEventListener('paste', this.paste.bind(this));


    // Should be refactored;
    ((w: any)=>{
      w.r = this.injectMap.bind(this);
    })(window);
  }

  copy(e: any) {
    e.clipboardData.setData('text/plain', JSON.stringify(this.map.getMap()));
    e.preventDefault();
  }

  paste(e: any) {
    this.injectMap(e.clipboardData.getData('text/plain'));
    e.preventDefault();
  }

  injectMap(source: any) {
    return this.map.inject(source);
  }

  liveCycle() {
    this.camera.update(this.interaction);
    Scene.render(this.renderer, this.size, this.camera, this.map, this.interaction);

    requestAnimationFrame(() => {
      this.liveCycle();
    });
  }

  handleMouseDown(event: MouseEvent) {
    if (event.button === 0 && !this.interaction.addMovableObject) {
      if (this.interaction.action.type === 1) {
        this.map.addEnemy(new Vector(
          Math.floor((event.clientX - this.camera.position.x) / 40),
          Math.floor((this.size.height - (event.clientY - this.camera.position.y)) / 40)
        ), this.interaction.action.subType);
      } else if (this.interaction.action.type === 2) {
        this.map.addStar(new Vector(
          Math.floor((event.clientX - this.camera.position.x) / 40),
          Math.floor((this.size.height - (event.clientY - this.camera.position.y)) / 40)
        ));
      } else {
        this.interaction.pressed = true;
        this.interaction.start.apply(new Vector(
          Math.floor((event.clientX - this.camera.position.x) / 40),
          Math.floor((this.size.height - (event.clientY - this.camera.position.y)) / 40)
        ));
        this.interaction.current.apply(this.interaction.start.get());
      }
    } else if (event.button === 0 && this.interaction.addMovableObject) {
      this.interaction.pressed = true;
      this.interaction.start.apply(new Vector(
          Math.floor((event.clientX - this.camera.position.x) / 40),
          Math.floor((this.size.height - (event.clientY - this.camera.position.y)) / 40)
      ));
      this.interaction.current.apply(this.interaction.start.get());
    } else if (event.button === 2) {
      this.map.remove(new Vector(
        Math.floor((event.clientX - this.camera.position.x) / 40),
        Math.floor((this.size.height - (event.clientY - this.camera.position.y)) / 40)
      ));
    }
  }

  handleMouseMove(event: MouseEvent) {
    this.interaction.current.apply(new Vector(
      Math.floor((event.clientX - this.camera.position.x) / 40),
      Math.floor((this.size.height - (event.clientY - this.camera.position.y)) / 40)
    ));
  }

  handleMouseUp() {
    if (this.interaction.pressed && !this.interaction.addMovableObject) {
      this.interaction.pressed = false;
      this.interaction.end.apply(this.interaction.current.get());
      this.map.add(this.interaction);
    } else if (this.interaction.addMovableObject) {
      this.interaction.pressed = false;
      this.interaction.end.apply(this.interaction.current.get());
      this.map.makeItMovable(this.interaction);
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 37 || event.keyCode === 65) {
      this.interaction.left = true;
    }
    if (event.keyCode === 38 || event.keyCode === 87) {
      this.interaction.up = true;
    }
    if (event.keyCode === 39 || event.keyCode === 68) {
      this.interaction.right = true;
    }
    if (event.keyCode === 40 || event.keyCode === 83) {
      this.interaction.down = true;
    }
    if (event.key === 'z') {
      this.interaction.action.type = 0;
      this.interaction.action.subType = 0;
    }
    if (event.key === 'x') {
      this.interaction.action.type = 0;
      this.interaction.action.subType = 1;
    }
    if (event.key === 'c') {
      this.interaction.action.type = 0;
      this.interaction.action.subType = 2;
    }
    if (event.key === 'v') {
      this.interaction.action.type = 0;
      this.interaction.action.subType = 3;
    }
    if (event.key === 'b') {
      this.interaction.action.type = 0;
      this.interaction.action.subType = 4;
    }
    if (event.key === 'n') {
      this.interaction.action.type = 0;
      this.interaction.action.subType = 5;
    }
    if (event.key === 'k') {
      this.interaction.action.type = 0;
      this.interaction.action.subType = 6;
    }
    if (event.key === 'l') {
      this.interaction.action.type = 0;
      this.interaction.action.subType = 7;
    }
    if (event.key === 'j') {
      this.interaction.action.type = 0;
      this.interaction.action.subType = 8;
    }
    if (event.key === 'q') {
      this.interaction.addMovableObject = true;
    }
    if (event.key === 't') {
      if (confirm('Do you really want to reset whole map?')) {
        this.map.reset();
      }
    }
    if (event.keyCode === 69) {
      console.log(JSON.stringify(this.map.all));
    }
  }


  handleKeyUp(event: KeyboardEvent) {
    if (event.keyCode === 37 || event.keyCode === 65) {
      this.interaction.left = false;
    }
    if (event.keyCode === 38 || event.keyCode === 87) {
      this.interaction.up = false;
    }
    if (event.keyCode === 39 || event.keyCode === 68) {
      this.interaction.right = false;
    }
    if (event.keyCode === 40 || event.keyCode === 83) {
      this.interaction.down = false;
    }
    if (event.key === 'q') {
      this.interaction.addMovableObject = false;
    }
    // if (event.keyCode === 88 || event.keyCode === 67) {
    //   if (this.interaction.action.type === 1) {
    //     this.interaction.action.type = 0;
    //     this.interaction.action.subType = 0;
    //   }
    // }
    // if (event.keyCode === 90) {
    //   if (this.interaction.action.type === 2) {
    //     this.interaction.action.type = 0;
    //     this.interaction.action.subType = 0;
    //   }
    // }
    // if (event.keyCode === 86) {
    //   if (this.interaction.action.type === 0) {
    //     this.interaction.action.type = 0;
    //     this.interaction.action.subType = 0;
    //   }
    // }
  }

  contextMenu(event: any) {
    event.preventDefault();
  }

  mousemove(event: any) {
    if (event.buttons === 2) {
      this.move(event);
    }

    event.preventDefault();
  }

  move(event: any) {

  }

  handleSize() {
    let bound = this.rendererRef.getBoundingClientRect();
    this.size.width = bound.width;
    this.size.height = bound.height;

    this.rendererRef.width = this.size.width;
    this.rendererRef.height = this.size.height;
  }
}
