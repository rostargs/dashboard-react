export const convertToRGB = (value: string) => {
  const r = parseInt(value.substr(1, 2), 16);
  const g = parseInt(value.substr(3, 2), 16);
  const b = parseInt(value.substr(5, 2), 16);

  return { r, g, b };
};

type TRGB = { r: number; g: number; b: number };

export const converToHEX = (rgb: TRGB) => {
  const values = Object.values(rgb).map(Number);

  const hexValue = values
    .map((value) => {
      const clampedValue = Math.max(0, Math.min(value, 255));
      return clampedValue.toString(16).padStart(2, "0");
    })
    .join("");

  return "#" + hexValue.toUpperCase();
};
