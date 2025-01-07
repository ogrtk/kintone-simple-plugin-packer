import fs, { readFileSync } from "node:fs";
import path from "node:path";
import packer from "@kintone/plugin-packer";
import AdmZip from "adm-zip";
import yargs from "yargs/yargs";

/**
 * Get parameters
 * @returns
 */
function getParams() {
  const argv = yargs(process.argv)
    .option("input", {
      alias: "i",
      description: "The path of the plugin directory.",
      type: "string",
      demandOption: true,
    })
    .option("ppk", {
      description: "The path of the ppk file.",
      type: "string",
      demandOption: true,
    })
    .option("output", {
      alias: "o",
      description: "The path of the output packaged zip file.",
      type: "string",
      demandOption: true,
    })
    .help()
    .alias("help", "h")
    .parseSync();

  return {
    input: argv.input,
    ppk: argv.ppk,
    output: argv.output,
  };
}

/**
 * create zip buffer from the target directory
 * @param dirPath - target directory path
 * @returns Buffer - zipped data
 */
const zipDirectoryToBuffer = (dirPath: string): Buffer => {
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Directory not found: ${dirPath}`);
  }

  const zip = new AdmZip();

  const addFiles = (currentPath: string, rootPath: string) => {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const fullPath = path.join(currentPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // recursive when directory
        addFiles(fullPath, rootPath);
      } else {
        // add file
        const relativePath = path.relative(rootPath, fullPath);
        zip.addLocalFile(fullPath, path.dirname(relativePath));
      }
    }
  };

  addFiles(dirPath, dirPath);

  // transform zip into buffer
  return zip.toBuffer();
};

// Get parameters
const { input, ppk, output } = getParams();

try {
  // Upload plugin file
  console.log("Creating zip archive...");

  const buf = zipDirectoryToBuffer(input);

  console.log("Packaging...");

  const ppkFullPath = path.join(process.cwd(), ppk);
  if (fs.existsSync(ppkFullPath)) {
    const pkey = fs.readFileSync(ppkFullPath);
    console.log("RePackaging existing package...");
    packer(buf, pkey.toString()).then((out) => {
      console.log(out.id);
      fs.writeFileSync(ppk, out.privateKey);
      fs.writeFileSync(output, out.plugin);
    });
  } else {
    console.log("Packaging new...");
    packer(buf).then((out) => {
      console.log(out.id);
      fs.writeFileSync(ppk, out.privateKey);
      fs.writeFileSync(output, out.plugin);
    });
  }

  console.log("Packed successfully:");
} catch (error) {
  console.error("An error has occurred.");
  console.error(error);
  throw error;
}
