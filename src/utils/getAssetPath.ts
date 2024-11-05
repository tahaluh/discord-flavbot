import path from "path";

export function getAssetPath(filename: string): string {
  return path.join(__dirname, "..", "assets", filename);
}

export function getAudioPath(filename: string): string {
  return getAssetPath(`audio/${filename}`);
}
