export interface tetromino {
  map: { [key: number]: number[] };
  offset: { x: number; y: number };
  width: number;
  height: number;
}

type tetrominoes = [tetromino, tetromino, tetromino, tetromino][];

const tetrominoes: tetrominoes = [
  [
    {
      map: {
        0: [0, 1],
        1: [0, 1],
      },
      offset: { x: 0, y: 0 },
      height: 2,
      width: 2,
    },
    {
      map: {
        0: [0, 1],
        1: [0, 1],
      },
      offset: { x: 0, y: 0 },
      height: 2,
      width: 2,
    },
    {
      map: {
        0: [0, 1],
        1: [0, 1],
      },
      offset: { x: 0, y: 0 },
      height: 2,
      width: 2,
    },
    {
      map: {
        0: [0, 1],
        1: [0, 1],
      },
      offset: { x: 0, y: 0 },
      height: 2,
      width: 2,
    },
  ],
  [
    {
      map: {
        0: [1],
        1: [0, 1, 2],
      },
      offset: { x: 0, y: -1 },
      height: 2,
      width: 3,
    },
    {
      map: {
        0: [0],
        1: [0, 1],
        2: [0],
      },
      offset: { x: 1, y: 1 },
      height: 3,
      width: 2,
    },
    {
      map: {
        0: [0, 1, 2],
        1: [1],
      },
      offset: { x: -1, y: 0 },
      height: 2,
      width: 3,
    },
    {
      map: {
        0: [1],
        1: [0, 1],
        2: [1],
      },
      offset: { x: 0, y: 0 },
      height: 3,
      width: 2,
    },
  ],
  [
    {
      map: {
        0: [0],
        1: [0],
        2: [0],
        3: [0],
      },
      offset: { x: 1, y: 1 },
      height: 4,
      width: 2,
    },
    {
      map: {
        0: [0, 1, 2, 3],
      },
      offset: { x: -1, y: -2 },
      height: 1,
      width: 4,
    },
    {
      map: {
        0: [0],
        1: [0],
        2: [0],
        3: [0],
      },
      offset: { x: 2, y: 2 },
      height: 4,
      width: 1,
    },
    {
      map: {
        0: [0, 1, 2, 3],
      },
      offset: { x: -2, y: -1 },
      height: 1,
      width: 4,
    },
  ],
  [
    {
      map: {
        0: [0, 1],
        1: [1],
        2: [1],
      },
      offset: { x: 0, y: 0 },
      height: 3,
      width: 2,
    },
    {
      map: {
        0: [2],
        1: [0, 1, 2],
      },
      offset: { x: 0, y: -1 },
      height: 2,
      width: 3,
    },
    {
      map: {
        0: [0],
        1: [0],
        2: [0, 1],
      },
      offset: { x: 1, y: 1 },
      height: 3,
      width: 2,
    },
    {
      map: {
        0: [0, 1, 2],
        1: [0],
      },
      offset: { x: -1, y: 0 },
      width: 3,
      height: 2,
    },
  ],
  [
    {
      map: {
        0: [0, 1],
        1: [0],
        2: [0],
      },
      offset: { x: 1, y: 1 },
      width: 2,
      height: 3,
    },
    {
      map: {
        0: [0, 1, 2],
        1: [2],
      },
      offset: { x: -1, y: 0 },
      width: 3,
      height: 2,
    },
    {
      map: {
        0: [1],
        1: [1],
        2: [0, 1],
      },
      offset: { x: 0, y: 0 },
      width: 2,
      height: 3,
    },
    {
      map: {
        0: [0],
        1: [0, 1, 2],
      },
      offset: { x: 0, y: -1 },
      width: 3,
      height: 2,
    },
  ],
  [
    {
      map: {
        0: [0, 1],
        1: [1, 2],
      },
      offset: { x: 0, y: -1 },
      width: 3,
      height: 2,
    },
    {
      map: {
        0: [1],
        1: [0, 1],
        2: [0],
      },
      offset: { x: 1, y: 1 },
      width: 2,
      height: 3,
    },
    {
      map: {
        0: [0, 1],
        1: [1, 2],
      },
      offset: { x: -1, y: 0 },
      width: 3,
      height: 2,
    },
    {
      map: {
        0: [1],
        1: [0, 1],
        2: [0],
      },
      offset: { x: 0, y: 0 },
      width: 2,
      height: 3,
    },
  ],
  [
    {
      map: {
        0: [1, 2],
        1: [0, 1],
      },
      offset: { x: 0, y: -1 },
      width: 3,
      height: 2,
    },
    {
      map: {
        0: [0],
        1: [0, 1],
        2: [1],
      },
      offset: { x: 1, y: 1 },
      width: 2,
      height: 3,
    },
    {
      map: {
        0: [1, 2],
        1: [0, 1],
      },
      offset: { x: -1, y: 0 },
      width: 3,
      height: 2,
    },
    {
      map: {
        0: [0],
        1: [0, 1],
        2: [1],
      },
      offset: { x: 0, y: 0 },
      width: 2,
      height: 3,
    },
  ],
];

export default tetrominoes;
