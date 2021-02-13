class Board extends Array {
	static CREATED = 0;
	static STARTED = 1;
	static FINISHED = 2;
	static LOST = 3;
	static FINISHED_ICONS = ['fa-grin-stars', ' fa-laugh-wink', 'fa-grin-beam', 'fa-grin-hearts'];
	static LOST_ICONS = ['fa-dizzy', 'fa-flushed', 'fa-tired', 'fa-sad-tear'];


	set(row, col, bomb) {
		this.row = row;
		this.col = col;
		this.bomb = bomb;
		this.flagCount = 0;
		this.status = Board.CREATED;
		this.icon = 'fa-smile';
		for (let x = 0; x < row; x++) {
			let boardRow = [];
			for (let y = 0; y < col; y++) {
				let num = x * col + y;
				boardRow.push(new Cell(x, y, num));
			}
			this.push(boardRow);
		}
	}
}