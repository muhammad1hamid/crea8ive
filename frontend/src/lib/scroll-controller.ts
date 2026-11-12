type ScrollController = { scrollTo: (target: number, options: { duration: number; force?: boolean; lock?: boolean; onComplete?: () => void }) => void };
let controller: ScrollController | null = null;
export function registerScrollController(value: ScrollController | null) { controller = value; }
export function getScrollController() { return controller; }
