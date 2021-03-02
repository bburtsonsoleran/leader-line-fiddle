import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[appLeaderLineAnchor]' })
export class LeaderLineAnchorDirective {
  @Input('appLeaderLineAnchorFor') targetId: string;
  constructor(public readonly elementRef: ElementRef<HTMLElement>) {}
}
