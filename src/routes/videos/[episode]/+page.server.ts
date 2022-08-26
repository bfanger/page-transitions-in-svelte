import { fetchEpisode, fetchAll, toTeaser } from "$lib/services/episode-fns";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const episode = await fetchEpisode(params.episode);
  const episodes = await fetchAll();
  return {
    title: episode.title,
    videoId: episode.snippet.resourceId.videoId,
    poster: episode.snippet.thumbnails.medium.url,
    date: episode.date,
    description: episode.html,
    teasers: episodes.map(toTeaser),
  };
};
