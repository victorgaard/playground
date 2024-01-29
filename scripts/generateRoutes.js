/* eslint-env node */

import fs from "fs";
import glob from "glob";
import path from "path";

const folderPath = path.join(process.cwd(), "src", "components");
const files = glob.sync(path.join(folderPath, "**", "*.playground.{ts,tsx}"));
const fileNames = files.map((file) => {
  const href = path.basename(file).split(".")[0];
  const label = href
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  return {
    label,
    href,
  };
});

fs.writeFileSync(
  path.join(process.cwd(), "src", "static", "routes.ts"),
  "export const routes = " + JSON.stringify(fileNames) + ";",
  "utf-8",
);
