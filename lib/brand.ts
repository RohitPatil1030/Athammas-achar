import fs from "node:fs";
import path from "node:path";

const logoFiles = ["logo.jpg", "logo.jpeg", "logo.png", "logo.webp"] as const;

export function getBrandLogoSrc() {
  const brandDir = path.join(process.cwd(), "public", "brand");
  const file = logoFiles.find((name) => fs.existsSync(path.join(brandDir, name)));
  return file ? `/brand/${file}` : null;
}
