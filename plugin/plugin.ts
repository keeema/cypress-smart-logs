/// <reference types="../index" />

import * as fs from "fs";
import * as path from "path";

export function install(on: Cypress.PluginEvents, _config: Cypress.ConfigOptions): void {
  on("task", {
    "write-smart-logs": ({ filePath, content }: { filePath: string; content: string }) => writeLogs(filePath, content),
  });
  on("before:run", (details) => {
    clearFiles(details.config["smart-logs-folder"] || "cypress/smart-logs");
  });
}

function clearFiles(directory: string): null {
  if (!fs.existsSync(directory)) return null;
  const files = fs.readdirSync(directory);
  try {
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => err && console.log(err));
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}

function writeLogs(filePath: string, content: string): null {
  try {
    console.log(filePath);
    const resolvedPath = path.resolve(filePath);
    const targetDir = path.dirname(resolvedPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.appendFileSync(resolvedPath, content);
  } catch (err) {
    console.log(err);
  }
  return null;
}
