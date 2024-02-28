import { bodyParser } from "@koa/bodyparser";
import cors from "@koa/cors";
import Router from "@koa/router";
import Koa from "koa";

import { createShortCutForUrl, getUrlForShortcut } from "./shortcuts";

const app = new Koa();
app.use(bodyParser());
app.use(cors());

const router = new Router();

router.get("/:shortcut", (ctx) => {
  const shortcut = ctx.params.shortcut;
  if (!shortcut) {
    return;
  }

  if (shortcut.includes(".")) {
    // Requesting a file with an extension
    return;
  }

  try {
    const url = getUrlForShortcut(shortcut, true);
    ctx.redirect(url);
  } catch (error) {
    console.error(error);
    ctx.throw(404);
  }
});

router.post("/shorten", async (ctx) => {
  // HACK: Simulate lag
  // await new Promise<void>((resolve) => setTimeout(() => resolve(), 3e3));
  try {
    const url = ctx.request.body.url?.trim();
    if (!url || typeof url !== "string") ctx.throw(400);
    const shortcut = createShortCutForUrl(url);
    ctx.body = { shortcut: `http://localhost:${process.env.PORT}/${shortcut}` };
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400);
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT, () => {
  console.log(`Server ready http://localhost:${process.env.PORT}`);
});
