class Cell {
	constructor(x, y, number) {
		this.x = x;
		this.y = y;
		this.number = number;
		this.hasBomb = false;
		this.hasFlag = false;
		this.aroundBombCount = 0;
		this.opened = false;
	}

	toString() {
		return `x:${this.x}, y:${this.y}, hasBomb:${this.hasBomb}, aroundBombCount:${this.aroundBombCount}, opened:${this.opened}`
	}
}