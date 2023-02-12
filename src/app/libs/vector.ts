export class Vector {
  constructor(public x: number = 0, public y: number = 0) {}

  add(vector: Vector): Vector {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  angle(vector: Vector): number {
    return (typeof vector === 'undefined') ? Math.atan2(this.y, this.x) :
      Math.atan2(vector.y, vector.x) - Math.atan2(this.y, this.x);
  }

  apply(vector: Vector): Vector {
    this.x = vector.x;
    this.y = vector.y;
    return this;
  }

  distance(vector: Vector): number {
    // TODO: Math.hypot; Temporary solution;
    return ((math: any) => {
      return math.hypot(this.x - vector.x, this.y - vector.y);
    })(Math);
  }

  div(num: number) {
    this.x /= num;
    this.y /= num;
    return this;
  }

  dot(vector: Vector): number {
    return this.mag() * vector.mag() * Math.cos(this.angle(vector));
  }

  get(): Vector {
    return new Vector(this.x, this.y);
  }

  mag(): number {
    // TODO: Math.hypot; Temporary solution;
    return ((math: any) => {
      return math.hypot(this.x, this.y);
    })(Math);
  }

  mult(num: number): Vector {
    this.x *= num;
    this.y *= num;
    return this;
  }

  normalize(): Vector {
    let length = this.mag();
    if (length > 0) {
      this.div(length);
    }
    return this;
  }

  perpendicular(): Vector {
    let x = this.x;
    this.x = this.y;
    this.y = - x;
    return this;
  }

  round(): Vector {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  sub(vector: Vector): Vector {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  normal(vector: Vector): Vector {
    return new Vector(this.x - vector.x, this.y - vector.y).perpendicular().normalize();
  }
}
