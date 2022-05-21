import { fetchAll, toTeaser } from "$lib/services/episode-fns";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ params }) => {
  let episodes = await fetchAll();
  episodes = episodes.filter((episode) => episode.cohost === params.cohost);
  return { body: episodes.map(toTeaser) };
};
