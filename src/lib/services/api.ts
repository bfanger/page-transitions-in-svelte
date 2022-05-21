/**
 * Typed api wrapper with injectable fetch for SSR
 *
 * The responses of the api methods contain the data direcly but also have a hidden property.
 * This allows access to the headers and http status of the response using the helper methods.
 */
import type { Load, LoadOutputCache } from "@sveltejs/kit";
import buildUrl from "./buildUrl";
import type { ApiGetResponse } from "./api-types";

export type Fetch = (
  info: RequestInfo,
  init?: RequestInit
) => Promise<Response>;

type Config = RequestInit & {
  params?: Record<string, string>;
  fetch?: Fetch;
  ssrCache?: number;
};
const responseSymbol = Symbol("response");
type ApiResponse<T = unknown> = T & { [responseSymbol]: Response };

const endpoint = "/api/";
async function wrapped(
  method: RequestInit["method"],
  path: string,
  config: Config
): Promise<any> {
  // eslint-disable-next-line prefer-const
  let { ssrCache, fetch, params, ...init } = config;
  params = params || {};
  if (!fetch) {
    if (typeof window === "undefined") {
      throw new Error("Missing config.fetch");
    }
    fetch = window.fetch;
  }
  if (ssrCache && typeof window === "undefined") {
    init.headers = new Headers(init.headers);
    init.headers.append("Svelte-Cache", `${ssrCache}`);
  }
  init.method = method;
  const url = endpoint + buildUrl(path, params);
  const start = Date.now();
  const response = await fetch(url, init);
  const duration = (Date.now() - start) / 1000;
  if (duration > 1) {
    console.info(
      `${method} ${url.substring(endpoint.length)} took ${duration.toFixed(3)}s`
    );
  }
  if (!response.ok) {
    const error = new Error(
      `${method} ${url} failed: ${response.status} ${response.statusText}`
    ) as ApiResponse<Error>;
    error[responseSymbol] = response;
    throw error;
  }
  const data = await response.json();
  if (config.signal && config.signal.aborted) {
    throw new Error("Aborted");
  }
  data[responseSymbol] = response;
  return data;
}
const api = {
  get<T extends keyof ApiGetResponse>(
    path: T,
    config?: Config
  ): Promise<ApiResponse<ApiGetResponse[T]>> {
    return wrapped("GET", path, config || {});
  },
};
export default api;

function getResponse(dataOrError: ApiResponse | unknown): Response | undefined {
  if (typeof dataOrError === "object" && dataOrError !== null) {
    return (dataOrError as any)[responseSymbol];
  }
  return undefined;
}

export function getStatus(
  dataOrError: ApiResponse | unknown
): number | undefined {
  const response = getResponse(dataOrError);
  if (response) {
    return response.status;
  }
  return undefined;
}

export function getStatusText(
  dataOrError: ApiResponse | unknown
): string | undefined {
  const response = getResponse(dataOrError);
  if (response) {
    return response.statusText;
  }
  return undefined;
}

export function getHeader(
  dataOrError: ApiResponse | unknown,
  name: string
): string | undefined {
  const response = getResponse(dataOrError);
  if (response) {
    const value = response.headers.get(name);
    if (value !== null) {
      return value;
    }
  }
  return undefined;
}

export function getCacheConfig(
  response: ApiResponse | unknown
): LoadOutputCache | undefined {
  const cacheControl = getHeader(response, "Cache-Control");
  const match = cacheControl && cacheControl.match(/^max-age=([0-9]+)/);
  if (match) {
    return { maxage: parseInt(match[1], 10) };
  }
  return undefined;
}

/**
 * Report the error message and generate a load response that will go the the __error.svelte route.
 */
export function loadError(err: Error | unknown): ReturnType<Load> {
  const error = err as Error;
  const code = getStatus(err);
  if (code === undefined) {
    console.error(error);
  } else {
    const clean = new Error(error.message || "load error");
    clean.stack = error.stack;
    clean.name = error.name;
    console.error(clean);
  }
  return {
    status: code && code > 400 ? code : 500,
    error: error || "load error",
  };
}
