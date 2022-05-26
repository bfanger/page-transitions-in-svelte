import { fetchEpisode } from "$lib/services/episode-fns";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ params }) => {
  const episode = await fetchEpisode(params.episode);
  return {
    body: {
      title: episode.title,
      videoId: episode.snippet.resourceId.videoId,
      poster: episode.snippet.thumbnails.medium.url,
      date: episode.date,
      description: episode.html,
    },
  };
};
