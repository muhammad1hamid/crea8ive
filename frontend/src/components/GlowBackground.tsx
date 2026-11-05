import styles from './glow.module.css';

type GlowBackgroundProps = {
  /** Extra classes merged onto the wrapper (e.g. a Tailwind z-index override). */
  className?: string;
};

/**
 * GlowBackground — a luxury "ember glow" backdrop.
 *
 * Renders three large, blurred orange/amber radial orbs that slowly drift, pulse
 * and rotate using pure CSS keyframes (no canvas/WebGL). Drop it as the first
 * child of any `position: relative; overflow: hidden;` wrapper; it fills the
 * parent (`inset: 0`), sits at `z-index: 0`, and is `pointer-events: none`, so
 * page content placed above it (any positioned element with z-index ≥ 1) stays
 * fully interactive.
 *
 * Performance: GPU-composited transforms/opacity only, sizes shrink and blur
 * softens under 768px, and all motion is disabled under
 * `prefers-reduced-motion: reduce`.
 */
export default function GlowBackground({ className }: GlowBackgroundProps) {
  return (
    <div
      className={className ? `${styles.glow} ${className}` : styles.glow}
      aria-hidden="true"
    >
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
    </div>
  );
}
