import { fetchAll, toTeaser } from "$lib/services/episode-fns";
import type { RequestHandler } from "@sveltejs/kit";

// eslint-disable-next-line import/prefer-default-export
export const get: RequestHandler = async ({ params }) => {
  let episodes = await fetchAll();
  episodes = episodes.filter((episode) => episode.cohost === params.cohost);
  return {
    body: {
      teasers: episodes.map(toTeaser),
    },
  };
};
