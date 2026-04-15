import { publicDir } from "./utils/site-data.mjs";
import { startStaticServer } from "./utils/static-server.mjs";

const port = Number(process.env.PORT || "4173");

const main = async () => {
  const server = await startStaticServer({ rootDir: publicDir, port });
  console.log(`Serving ${publicDir} on ${server.url}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
