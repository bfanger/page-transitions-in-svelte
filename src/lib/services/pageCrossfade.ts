import { crossfade, type TransitionConfig } from "svelte/transition";
import { writable } from "svelte/store";

export const activeVideoId = writable("");

const [send, receive] = crossfade({ duration: 300 });

export function pageIn(node: Element, key: any): any {
  const fn = receive(node, { key });
  return () => {
    return noFade(fn());
  };
}

export function pageOut(node: Element, key: any): any {
  const fn = send(node, { key });
  return () => {
    return noFade(fn());
  };
}

function noFade(transition: TransitionConfig | undefined) {
  if (transition) {
    return {
      ...transition,
      css(t: number, u: number) {
        const css = transition.css?.(t, u).replace(/opacity: [^;]+;/, "");
        return css;
      },
    };
  }
  return transition;
}
