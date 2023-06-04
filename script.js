const { createApp } = Vue;

createApp({
  data() {
    return {
      score: 0,
      boardState: [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    };
  },
  mounted() {
    document.addEventListener("keyup", this.move);
  },
  unmounted() {
    document.removeEventListener("keyup", this.move);
  },
  methods: {

    
    findRandomEmptyCell() {
      var cells = [];
      for ([rowI, row] of this.boardState.entries()) {
        for ([colI, col] of row.entries()) {
          if (!col) {
          cells.push({colI, rowI})
          }
        }
      }

      if (cells.length) {
        return cells[Math.floor(Math.random() * cells.length)];
      }

    },

    handleMovement(x, y, rowI, colI) {
      if (y != 0) {
        if (rowI + y < 4 && rowI + y > -1) {
          if (this.boardState[rowI + y][colI] == 0) {
            this.boardState[rowI + y][colI] = this.boardState[rowI][colI];
            this.boardState[rowI][colI] = 0;
          } else if (
            this.boardState[rowI + y][colI] == this.boardState[rowI][colI]
          ) {
            this.boardState[rowI + y][colI] = this.boardState[rowI][colI] * 2;
            this.score += this.boardState[rowI][colI] * 2;
            
            this.boardState[rowI][colI] = 0;
          } else {
            return;
          }
          try {
            if (this.boardState[rowI + y + y][colI] == 0) {
              this.handleMovement(x, y, rowI + y, colI + x);
            }
          } catch {}
        } else {
          return;
        }
      } else {
                if (colI + x < 4 && colI + x > -1) {
          if (this.boardState[rowI][colI + x] == 0) {
            this.boardState[rowI][colI + x] = this.boardState[rowI][colI];
            this.boardState[rowI][colI] = 0;
          } else if (
            this.boardState[rowI][colI + x] == this.boardState[rowI][colI]
          ) {
            this.boardState[rowI][colI+ x] = this.boardState[rowI][colI] * 2;
            this.score += this.boardState[rowI][colI] * 2;

            this.boardState[rowI][colI] = 0;
          } else {
            return;
          }
          try {
            if (this.boardState[rowI][colI + x + x] == 0) {
              this.handleMovement(x, y, rowI + y, colI + x);
            }
          } catch {}
        } else {
          return;
        }

      }
    },
    move(event) {
      let x = 0;
      let y = 0;
      if (event.key == "ArrowDown") {
        y = 1;
      }
      else if (event.key == "ArrowUp") {
        y = -1;
      }
      else if (event.key == "ArrowLeft") {
        x = -1;
      }
      else if (event.key == "ArrowRight") {
        x = 1;
      } else {
        return;
      }
      for ([rowI, row] of this.boardState.entries()) {
        for ([colI, col] of row.entries()) {
          this.handleMovement(x, y, rowI, colI);
        }
      }
      for ([rowI, row] of this.boardState.entries()) {
        for ([colI, col] of row.entries()) {
          this.handleMovement(x, y, rowI, colI);
        }
      }
      let cell = this.findRandomEmptyCell();
      this.boardState[cell.rowI][cell.colI] = (Math.random() > 0.9) ? 4 : 2;
      console.log(this.boardState);
    },
  },
  computed: {
    won() {
      return this.boardState.some(row => row.includes(2048));
    },
  },
}).mount("#app");
