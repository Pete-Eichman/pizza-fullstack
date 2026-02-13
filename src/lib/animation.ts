/** Cubic ease-in-out for smooth slice rotation. */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Calculate per-slice rotation offsets for the wave animation.
 *
 * Each slice does a full 360-degree flip, staggered so the next slice
 * begins when the previous is ~25 % through its flip.
 * `reverse=true` starts the cascade from the last slice (CCW feel).
 */
export function getWaveOffsets(time: number, reverse = false): number[] {
  const sliceDuration = 0.8;
  const stagger = 0.25 * sliceDuration;
  const cycleDuration = sliceDuration + 7 * stagger;
  const t = ((time % cycleDuration) + cycleDuration) % cycleDuration;

  const offsets: number[] = [];
  for (let s = 0; s < 8; s++) {
    const idx = reverse ? 7 - s : s;
    const sliceStart = idx * stagger;
    const progress = Math.max(0, Math.min(1, (t - sliceStart) / sliceDuration));
    offsets.push(easeInOutCubic(progress) * Math.PI * 2);
  }
  return offsets;
}
