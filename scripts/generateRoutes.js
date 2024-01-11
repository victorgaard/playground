/* eslint-env node */

import fs from "fs";
import glob from "glob";
import path from "path";

const folderPath = path.join(process.cwd(), "src", "components");
const files = glob.sync(path.join(folderPath, "*"));
const fileNames = files.map((file) => {
  const component = path.basename(file).split(".")[0];
  return {
    label: component,
    href: component,
  };
});

fs.writeFileSync(
  path.join(process.cwd(), "src", "utils", "routes.ts"),
  "export const routes = " + JSON.stringify(fileNames) + ";",
  "utf-8",
);
