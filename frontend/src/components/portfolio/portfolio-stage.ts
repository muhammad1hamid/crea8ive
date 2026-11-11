const clamp = (value: number) => Math.max(0, Math.min(1, value));

function ease(from: number, to: number, value: number) {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
}

// Scroll position is measured in projects. Only these physical prints exist on stage.
export function stageFrames(position: number, count: number, compact: boolean) {
  const first = Math.floor(position);
  const fraction = position - first;
  // Slow the camera near each project stop, even during one continuous scroll.
  const camera = first + .18 * fraction + .82 * ease(0, 1, fraction);
  const last = Math.min(count - 1, first + 5);
  const frames = [];
  for (let index = first; index <= last; index++) {
    const depth = index - camera;
    const behind = Math.max(0, depth);
    const exit = ease(.42, 1, -depth);
    const opacity = (1 - ease(4, 5, depth)) * (1 - exit);
    if (opacity === 0) continue;

    // Project both lanes towards the same vanishing point. Successive prints
    // take up less space and move more slowly as they recede into the distance.
    const projection = 1 / (1 + .44 * behind + .042 * behind * behind);
    const distance = 1 - projection;
    const side = index % 2 === 0 ? -1 : 1;
    const x = compact
      ? side * (2 + 31 * distance + 65 * exit)
      : side * (28.5 - 20 * distance + 29 * exit);
    const y = (compact ? 8 : 10) - (compact ? 43 : 48) * distance + 9 * exit;
    const scale = projection + .14 * exit;
    const yaw = side * (13 * distance - 5 * exit);
    frames.push({
      index, current: index === Math.round(position), opacity,
      artworkOpacity: 1 - .8 * distance,
      transform: `translate(-50%, -50%) translate3d(${x}vw, ${y}svh, 0) scale(${scale}) perspective(1100px) rotateY(${yaw}deg)`,
      zIndex: count - index,
    });
  }
  return frames;
}
