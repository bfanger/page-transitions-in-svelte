import type { TransitionConfig } from "svelte/types/runtime/transition";

export default function delay(_: Element, duration: number): TransitionConfig {
  return {
    delay: duration,
  };
}
