import fs from "fs/promises";

export default async function writeFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
