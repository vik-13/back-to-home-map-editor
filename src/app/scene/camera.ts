import { Vector } from '../libs/vector';

export class Camera {
  position: Vector;
  private speed = 13;

  constructor() {
    this.position = new Vector();
  }

  update(interaction: any) {
    if (interaction.left) {
      this.position.add(new Vector(this.speed, 0));
    }
    if (interaction.right) {
      this.position.add(new Vector(-this.speed, 0));
    }
    if (interaction.up) {
      this.position.add(new Vector(0, this.speed));
    }
    if (interaction.down) {
      this.position.add(new Vector(0, -this.speed));
    }
  }

  render(renderer: CanvasRenderingContext2D, size: any) {
    renderer.translate(this.position.x, this.position.y);
  }
}
