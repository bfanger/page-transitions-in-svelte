# Page transitions for the web in Svelte

A Google IO talk [Bringing page transitions to the web (Youtube)](https://www.youtube.com/watch?v=JCJUPJ_zDQ4)
given by [Jake Archibald](https://jakearchibald.com/)

Inspired me to recreate these animations using [Svelte](https://svelte.dev/)

- [Demo (Svelte)](https://http203-playlist-svelte.netlify.app/)
- [Demo (Original)](https://http203-playlist.netlify.app/) - [src](https://github.com/jakearchibald/http203-playlist)

> "Well, the truth is it's really hard with the APIs we have today"

True, I've had to hack both the source and target pages to facilitate the transitions.

> "It's not particularly easy in modern frameworks"

Svelte's powerful animation system helps a lot, but as both pages are active at once, getting good performance is hard, especially because a navigation is a big DOM change.
