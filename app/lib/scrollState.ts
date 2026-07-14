/**
 * Shared scroll state: GSAP drives this ref, R3F/DOM components read it.
 * Progress is a normalized 0→1 value representing full page scroll.
 */

// Module-level shared scroll state: GSAP drives this, R3F reads it.
// `progress` getter returns the smooth value (lerp'd each frame).
// The setter writes the *target* value; `tick()` does the smoothing.

let _scrollProgress = 0;
let _scrollTarget = 0;

export const scrollState = {
  /** Current smooth scroll progress (0→1) */
  get progress() {
    return _scrollProgress;
  },
  set progress(value: number) {
    _scrollTarget = Math.max(0, Math.min(1, value));
  },

  /** Called each frame to lerp `_scrollProgress` → `_scrollTarget` */
  tick(speed = 0.05) {
    _scrollProgress += (_scrollTarget - _scrollProgress) * speed;
    if (Math.abs(_scrollProgress - _scrollTarget) < 0.0001) {
      _scrollProgress = _scrollTarget;
    }
  },
};
