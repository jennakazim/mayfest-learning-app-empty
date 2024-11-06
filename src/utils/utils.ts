export const createBackgroundGradient = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(236, 253, 245, 1)"); // Very light green
  gradient.addColorStop(1, "rgba(209, 250, 229, 1)"); // Slightly darker light green
  return gradient;
};
