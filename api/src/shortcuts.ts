import { nanoid } from "nanoid";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createShortCutForUrl = async (url: string) => {
  const shortcut = nanoid();

  const entry = await prisma.shortcut.create({
    data: { shortcut, url },
    select: { shortcut: true },
  });

  return entry.shortcut;
};

export const getUrlForShortcut = async (shortcut: string, hit = false) => {
  const entry = await prisma.shortcut.findFirst({
    select: { url: true, hits: true },
    where: { shortcut },
  });

  if (!entry) {
    throw new Error(`Could not find shortcut ${shortcut}`);
  }
  if (hit) {
    console.log(`This is the ${entry.hits + 1}th time ${shortcut} is used.`);
    await prisma.shortcut.update({
      data: { hits: entry.hits + 1 },
      where: { shortcut },
    });
  }
  return entry.url;
};
