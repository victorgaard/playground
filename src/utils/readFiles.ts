import fs from "vite-plugin-fs/browser";

export const routes = await fs
  .readdir("./src/components")
  .then((res) => res.map((item) => item.split(".")[0]));

export async function readFile(component: string) {
  const file = await fs.readFile(`./src/components/${component}.tsx`);
  return file;
}
