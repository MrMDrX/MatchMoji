import { crossfade } from "svelte/transition";
import { cubicOut } from "svelte/easing";

export const [send, receive] = crossfade({
  delay: 400,
  duration: 600,
  easing: cubicOut,
});
