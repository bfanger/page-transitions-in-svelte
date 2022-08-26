import { fetchAll, toTeaser } from "$lib/services/episode-fns";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const episodes = await fetchAll();
  return { teasers: episodes.map(toTeaser) };
};
