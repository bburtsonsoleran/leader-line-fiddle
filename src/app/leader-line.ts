export interface LeaderLine {
  new (options: { start: HTMLElement; end: HTMLElement } | any);
  remove(): void;
  position(): void;
}
