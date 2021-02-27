import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { animationFrameScheduler, BehaviorSubject, interval } from 'rxjs';
import { throttle, throttleTime } from 'rxjs/operators';
declare var LeaderLine: any;
export interface Vector2 {
  x: number;
  y: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('start', { static: true }) start: ElementRef<HTMLDivElement>;
  @ViewChild('end', { static: true }) end: ElementRef<HTMLDivElement>;

  mouse$ = new BehaviorSubject<Vector2>({ x: 0, y: 0 });
  @HostListener('document:mousemove', ['$event']) mouseMove = ({
    clientX,
    clientY,
  }) => this.mouse$.next({ x: clientX, y: clientY });

  ngOnInit() {
    const line = new LeaderLine(
      this.start.nativeElement,
      this.end.nativeElement
    );
    interval(1, animationFrameScheduler).subscribe(() => {
      line.position();
    });

    this.mouse$.subscribe((pos) => {
      this._lookAt(this.start, pos);
      this._lookAt(this.end, pos);
    });
  }

  private _lookAt(element: ElementRef<HTMLElement>, position: Vector2) {
    const css = element.nativeElement.style.transform
      .split(' ')
      .filter((r) => !r.startsWith('rotate'))
      .join(' ');

    const rotation = this._calcRotation(element, position);

    const rotationCss = this._formatRotationCss(rotation);

    element.nativeElement.style.transform = `${css} ${rotationCss}`;
  }

  private _calcRotation(element: ElementRef<HTMLElement>, pos: Vector2) {
    const { clientHeight, clientWidth } = element.nativeElement;
    const { top, left } = element.nativeElement.getBoundingClientRect();
    const avgSideLength = (clientHeight + clientWidth) / 2;
    const degQuotient = 360 / 100;
    const viewRange = 0.22;
    const scale = (avgSideLength / degQuotient) * viewRange;
    const xAxis = (pos.y - top) / clientHeight;
    const yAxis = (pos.x - left) / clientWidth;

    const rotation = {
      x: parseFloat((xAxis * -scale + scale / 2).toFixed(1)),
      y: parseFloat((yAxis * scale - scale / 2).toFixed(1)),
    };
    return rotation;
  }
  private _formatRotationCss({ x, y }: Vector2) {
    return `rotateX(${x}deg) rotateY(${y}deg)`;
  }

  private _removeRotationCss(cssStr: string) {
    const regex = /rotate[XY]\([A-z0-9\-\.]+\)/gim;
    return cssStr.replace(regex, '');
  }
}
