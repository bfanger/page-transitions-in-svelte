import { fetchAll, toTeaser } from "$lib/services/episode-fns";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
  const episodes = await fetchAll();
  return { body: episodes.map(toTeaser) };
};
