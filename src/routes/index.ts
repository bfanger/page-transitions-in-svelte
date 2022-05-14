import { fetchAll, toTeaser } from "$lib/services/episode-fns";
import type { RequestHandler } from "@sveltejs/kit";

// eslint-disable-next-line import/prefer-default-export
export const get: RequestHandler = async ({ url }) => {
  let episodes = await fetchAll();
  const cohost = url.searchParams.get("with");
  if (cohost) {
    episodes = episodes.filter((episode) => episode.cohost === cohost);
  }
  return {
    body: {
      teasers: episodes.map(toTeaser),
    },
  };
};
