import type { TransitionConfig } from "svelte/types/runtime/transition";

export default function delay(
  node: Element,
  duration: number
): TransitionConfig {
  return {
    delay: duration,
  };
}
