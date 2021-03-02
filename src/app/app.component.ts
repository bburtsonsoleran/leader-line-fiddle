import { Component, QueryList, ViewChildren } from '@angular/core';
import { animationFrames } from '@soleran/common';

import { LeaderLineAnchorDirective } from './leader-line-anchor.directive';
import { LeaderLineElementDirective } from './leader-line-element.directive';
import { startWith } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { LeaderLine } from './leader-line';
declare var LeaderLine: LeaderLine;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChildren(LeaderLineElementDirective)
  lineElements: QueryList<LeaderLineElementDirective>;

  @ViewChildren(LeaderLineAnchorDirective)
  anchorElements: QueryList<LeaderLineAnchorDirective>;

  targets = new Array(1).fill(null);

  lines: LeaderLine[] = [];

  private _subs = new Subscription();
  ngAfterViewInit(): void {
    this._subs.add(
      this._lineElementChanges().subscribe((items) => {
        this._removeLines();
        this.lines = this._createLines(items);
      })
    );
    this._subs.add(
      animationFrames(1000 / 60).subscribe((_) => this._renderLines())
    );
  }
  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
  onAddNodeClick() {
    this.targets.push(null);
  }

  private _removeLines(): void {
    this.lines.forEach((l) => l.remove());
  }
  private _renderLines(): void {
    this.lines.forEach((l) => l.position());
  }
  private _lineElementChanges(): Observable<
    QueryList<LeaderLineElementDirective>
  > {
    return this.lineElements.changes.pipe(startWith(this.lineElements));
  }
  private _createLines(items: QueryList<LeaderLineElementDirective>) {
    const root = items.find((el) => el.id === 'building');
    const targets = items.filter((el) => el.id !== 'building');
    return root.anchors.map((anchor) => {
      const target = targets.find((t) => t.id === anchor.targetId);
      return this._createLine(anchor, target);
    });
  }
  private _createLine(
    anchor: LeaderLineAnchorDirective,
    target: LeaderLineElementDirective
  ): LeaderLine {
    return new LeaderLine({
      start: anchor.elementRef.nativeElement,
      end: target.elementRef.nativeElement,
    });
  }
}
