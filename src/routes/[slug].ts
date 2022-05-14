import { fetchAll, fetchEpisode, toTeaser } from "$lib/services/episode-fns";
import type { RequestHandler } from "@sveltejs/kit";

// eslint-disable-next-line import/prefer-default-export
export const get: RequestHandler = async ({ params }) => {
  const episode = await fetchEpisode(params.slug);
  return {
    body: {
      title: episode.snippet.title,
      videoId: episode.snippet.resourceId.videoId,
      poster: episode.snippet.thumbnails.medium.url,
      date: episode.date,
      description: episode.html,
      teasers: (await fetchAll()).map(toTeaser),
    },
  };
};
