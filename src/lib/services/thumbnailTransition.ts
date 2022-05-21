import { crossfade } from "svelte/transition";

const [send, receive] = crossfade({ duration: 400 });
// export const intro{ intro, outro };
export function intro(node: Element, key: any) {
  return receive(node, { key });
}

export function outro(node: Element, key: any) {
  return send(node, { key });
}
