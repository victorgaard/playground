/* eslint-env node */

import fs from "fs";
import glob from "glob";
import path from "path";

const folderPath = path.join(process.cwd(), "src", "components");
const files = glob.sync(path.join(folderPath, "**", "*.playground.{ts,tsx}"));
const fileNames = files.map((file) => {
  const component = path.basename(file).split(".")[0];
  const filePath = path.relative(process.cwd(), file);
  return {
    label: component,
    href: component,
    path: filePath,
  };
});

fs.writeFileSync(
  path.join(process.cwd(), "src", "static", "routes.ts"),
  "export const routes = " + JSON.stringify(fileNames) + ";",
  "utf-8",
);
