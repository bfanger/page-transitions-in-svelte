import slugify from "slugify";
import { marked } from "marked";

type RawEpisodeDto = {
  kind: string;
  etag: string;
  id: string;

  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: ThumbnailDto;
      medium: ThumbnailDto;
      high: ThumbnailDto;
      standard?: ThumbnailDto;
      maxres?: ThumbnailDto;
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
};
type EpisodeDto = RawEpisodeDto & {
  slug: string;
  date: string;
  html: string;
  cohost: string;
};

type ThumbnailDto = {
  url: string;
  width: number;
  height: number;
};

let cache: Promise<EpisodeDto[]>;
export function fetchAll(): Promise<EpisodeDto[]> {
  if (!cache) {
    cache = (async () => {
      const response = await (
        await fetch(
          "https://raw.githubusercontent.com/jakearchibald/http203-playlist/main/lib/data.json"
        )
      ).json();
      return response.map((episode: EpisodeDto) => ({
        ...episode,
        slug: slugify(episode.snippet.title, {
          lower: true,
          strict: true,
        }),
        date: episode.snippet.publishedAt.substring(0, 10),
        html: marked.parse(episode.snippet.description),
        cohost: calcCohost(episode),
      }));
    })();
  }
  return cache;
}

export async function fetchEpisode(slug: string) {
  const all = await fetchAll();
  const episode = all.find((entry) => entry.slug === slug);
  if (!episode) {
    throw new Error("Episode not found");
  }
  return episode;
}
export type TeaserDto = {
  href: string;
  src: string;
  alt: string;
  title: string;
};
export function toTeaser(episode: EpisodeDto): TeaserDto {
  return {
    href: `/${episode.slug}`,
    src: episode.snippet.thumbnails.medium.url,
    alt: episode.snippet.title,
    title: episode.date,
  };
}

function calcCohost(data: RawEpisodeDto) {
  const timestamp = new Date(data.snippet.publishedAt).getTime();
  if (timestamp >= 1646000000000) {
    return "ada";
  }
  if (timestamp >= 1470000000000) {
    return "surma";
  }
  return "paul";
}
