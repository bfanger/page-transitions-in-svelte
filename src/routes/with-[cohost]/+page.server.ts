// eslint-disable-next-line import/extensions
import cohosts from "$lib/cohosts.json";
import { fetchAll, toTeaser } from "$lib/services/episode-fns";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  let episodes = await fetchAll();
  episodes = episodes.filter((episode) => episode.cohost === params.cohost);
  const teasers = episodes.map(toTeaser);
  return {
    cohost: params.cohost,
    name: cohosts.find((entry) => entry.slug === params.cohost)?.name,
    teasers,
  };
};
