import { env } from "$env/dynamic/private";

// Remove prerender when switching to the adapter-node (SSR)
export const prerender = true;

/**
 * Enable or disable indexing of the site.
 *
 * @link https://www.robotstxt.org/robotstxt.html
 */
export const GET = () => {
  let allow = true;
  const robotstxt = env.ROBOTSTXT;
  if (robotstxt === "noindex") {
    allow = false;
  } else if (robotstxt !== "index") {
    console.warn("Invalid ROBOTSTXT env, expecting 'noindex' or 'index'");
  }

  return new Response(`User-agent: *
Disallow:${allow ? "" : " /"}
`);
};
