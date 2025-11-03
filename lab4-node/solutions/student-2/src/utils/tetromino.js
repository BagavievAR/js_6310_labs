const TETROMINOES = [
  { name: "I", shape: ["####"] },
  { name: "O", shape: ["##", "##"] },
  { name: "T", shape: ["###", " # "] },
  { name: "S", shape: [" ##", "## "] },
  { name: "Z", shape: ["## ", " ##"] },
  { name: "J", shape: ["#  ", "###"] },
  { name: "L", shape: ["  #", "###"] }
];

const toPreview = (shape) => shape.join("\n");

export function randomTetromino(rng = Math.random()) {
  if (typeof rng !== "number" || Number.isNaN(rng)) {
    throw new Error("rng must be a number");
  }
  if (!Number.isFinite(rng)) {
    throw new Error("rng must be finite");
  }
  if (rng < 0) {
    throw new Error("rng must be >= 0");
  }
  if (rng >= 1) {
    throw new Error("rng must be < 1");
  }
  const i = Math.floor(rng * TETROMINOES.length);
  const t = TETROMINOES[i];
  return { name: t.name, preview: toPreview(t.shape) };
}

export { TETROMINOES };
