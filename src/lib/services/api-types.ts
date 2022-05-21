export type ApiGetResponse = {
  "teasers.json": TeaserDto[];
  "teasers/[cohost].json": TeaserDto[];
  "episodes/[episode].json": EpisodeDto[];
};
export type TeaserDto = {
  videoId: string;
  href: string;
  src: string;
  alt: string;
  title: string;
};

export type EpisodeDto = {
  title: string;
  videoId: string;
  poster: string;
  date: string;
  description: string;
};
