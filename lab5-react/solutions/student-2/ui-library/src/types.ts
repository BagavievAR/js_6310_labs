export type CellColorId = number

export interface TetrominoCell {
  x: number
  y: number
}

export interface Tetromino {
  cells: TetrominoCell[]
  colorId: CellColorId
}
