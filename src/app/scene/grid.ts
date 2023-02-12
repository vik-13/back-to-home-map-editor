import { Vector } from '../libs/vector';
import { mapConfig } from './map-config';

export function renderGrid(r: CanvasRenderingContext2D, mapSize: Vector, size: Vector, gridSize: number) {
    r.save();
    r.font = '12px serif';
    r.fillStyle = 'black';
    r.strokeStyle = 'black';
    r.lineWidth = .2;

    for (let i = 0; i <= mapSize.y; i++) {
        r.beginPath();
        r.moveTo(0, size.y - i * gridSize);
        r.lineTo(mapSize.x * gridSize, size.y - i * gridSize);
        r.lineWidth = (!((i) % 10)) ? .5 : .2;
        r.stroke();
        if (!((i) % 10)) {
            r.fillText((i).toString(), -gridSize / 2, size.y - i * gridSize - 10);
        }
        r.closePath();
    }

    for (let j = 0; j <= mapSize.x; j++) {
        r.beginPath();
        r.moveTo(j * gridSize, size.y);
        r.lineTo(j * gridSize, size.y - mapSize.y * gridSize);
        r.lineWidth = (!((j) % 10)) ? .5 : .2;
        r.stroke();
        if (!((j) % 10)) {
            r.fillText((j).toString(), j * gridSize + 10, size.y + (gridSize / 2));
        }
        r.closePath();
    }
    r.restore();
}