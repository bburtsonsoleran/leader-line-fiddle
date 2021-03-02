import {
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';
import { LeaderLineAnchorDirective } from './leader-line-anchor.directive';

@Directive({ selector: '[appLeaderLineElement]' })
export class LeaderLineElementDirective {
  @Input('appLeaderLineElementId') id: string;
  @ContentChildren(LeaderLineAnchorDirective, { descendants: true })
  readonly anchors: QueryList<LeaderLineAnchorDirective>;
  constructor(public readonly elementRef: ElementRef<HTMLElement>) {}
}
