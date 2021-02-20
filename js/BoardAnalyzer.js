class BoardAnalyzer {
	constructor(board) {
		this.board = board;
		this.callbacks = {
			getUpCell: (c) => this.getUpCell(c),
			getDownCell: (c) => this.getDownCell(c),
			getLeftCell: (c) => this.getLeftCell(c),
			getRightCell: (c) => this.getRightCell(c),
			getUpLeftCell: (c) => this.getUpLeftCell(c),
			getUpRightCell: (c) => this.getUpRightCell(c),
			getDownLeftCell: (c) => this.getDownLeftCell(c),
			getDownRightCell: (c) => this.getDownRightCell(c)
		};
	}

	initBoard(cell) {
		this.createBomb(cell);
		this.setAroundBombCount();
	}

	openCell(cell) {
		if (this.board.status === Board.CREATED) {
			this.board.status = Board.STARTED;
			this.initBoard(cell);
		}
		if (cell.opened || cell.hasFlag || this.board.status !== Board.STARTED) {
			return;
		}

		cell.opened = true;

		if (cell.hasBomb) {
			this.board.status = Board.LOST;
			return;
		}

		this.recursiveOpenCell(cell);

		if (this.isFinished()) {
			this.board.status = Board.FINISHED;
		}
	}

	onFlag(cell) {
		cell.hasFlag = !cell.hasFlag;
		if (cell.hasFlag) {
			this.board.flagCount++;
		} else {
			this.board.flagCount--;
		}
	}

	recursiveOpenCell(cell) {
		if (0 < cell.aroundBombCount) {
			return;
		}

		for (let func of Object.values(this.callbacks)) {
			let targetCell = func(cell);
			if (targetCell && !targetCell.opened) {
				targetCell.opened = true;
				if (targetCell.aroundBombCount === 0) {
					this.recursiveOpenCell(targetCell);
				}
			}
		}
	}

	setIcon() {
		let array = [];
		if (this.board.status === Board.FINISHED) {
			array = Board.FINISHED_ICONS;
		} else if (this.board.status === Board.LOST) {
			array = Board.LOST_ICONS;
		} else {
			return;
		}
		this.board.icon = array[Math.floor(Math.random() * array.length)];
	}

	isFinished() {
		for (let boardRow of this.board) {
			let hasCloseCell = boardRow.some(cell => !cell.hasBomb && !cell.opened);
			if (hasCloseCell) {
				return false;
			}
		}
		return true;
	}

	createBomb(cell) {
		let exclude = this.getCellAroundNumbers(cell);
		const max = this.board.row * this.board.col - 1;
		const randoms = Calculator.randomIntList(0, max, this.board.bomb, exclude);
		for (let i of randoms) {
			const x = Math.floor(i / this.board.col);
			const y = i % this.board.col;
			this.board[x][y].hasBomb = true;
		}
	}

	getCellAroundNumbers(cell) {
		let array = [cell.number];
		for (let func of Object.values(this.callbacks)) {
			let targetCell = func(cell);
			if (targetCell) {
				array.push(targetCell.number);
			}
		}
		return array;
	}

	setAroundBombCount() {
		for (let boardRow of this.board) {
			for (let cell of boardRow) {
				cell.aroundBombCount = this.countAroundBomb(cell);
			}
		}
	}

	countAroundBomb(cell) {
		let bombCount = 0;

		for (let func of Object.values(this.callbacks)) {
			let targetCell = func(cell);
			if (targetCell && targetCell.hasBomb) {
				bombCount++;
			}
		}

		return bombCount;
	}

	getUpCell(cell) {
		if (1 <= cell.x) {
			return this.board[cell.x - 1][cell.y];
		}
		return null;
	}

	getDownCell(cell) {
		if (cell.x < (this.board.row - 1)) {
			return this.board[cell.x + 1][cell.y];
		}
		return null;
	}

	getRightCell(cell) {
		if (cell.y < (this.board.col - 1)) {
			return this.board[cell.x][cell.y + 1];
		}
		return null;
	}

	getLeftCell(cell) {
		if (1 <= cell.y) {
			return this.board[cell.x][cell.y - 1];
		}
		return null;
	}

	getUpLeftCell(cell) {
		if (1 <= cell.x && 1 <= cell.y) {
			return this.board[cell.x - 1][cell.y - 1];
		}
		return null;
	}

	getUpRightCell(cell) {
		if (1 <= cell.x && cell.y < (this.board.col - 1)) {
			return this.board[cell.x - 1][cell.y + 1];
		}
		return null;
	}

	getDownLeftCell(cell) {
		if (cell.x < (this.board.row - 1) && 1 <= cell.y) {
			return this.board[cell.x + 1][cell.y - 1];
		}
		return null;
	}

	getDownRightCell(cell) {
		if (cell.x < (this.board.row - 1) && cell.y < (this.board.col - 1)) {
			return this.board[cell.x + 1][cell.y + 1];
		}
		return null;
	}

	boardLog() {
		for (let boardRow of this.board) {
			for (let cell of boardRow) {
				console.log(cell.toString());
			}
		}
	}
}