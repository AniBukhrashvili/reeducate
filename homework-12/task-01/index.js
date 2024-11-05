const fs = require("fs").promises;

async function main() {
  try {
    const dirs = await fs.readdir(__dirname);
    for (const dir of dirs) {
      const stats = await fs.lstat(dir);
      console.log(stats.isDirectory());
    }
  } catch (e) {
    console.error("Error: ", e);
  }
}

main();
