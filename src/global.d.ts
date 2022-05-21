/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

import type { Writable } from "svelte/store";

declare namespace App {
  interface Stuff {
    backVisisble: Writable<boolean>;
  }
}
