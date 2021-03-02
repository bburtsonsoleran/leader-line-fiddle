import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { LeaderLineElementDirective } from './leader-line-element.directive';
import { LeaderLineAnchorDirective } from './leader-line-anchor.directive';

@NgModule({
  declarations: [AppComponent, LeaderLineElementDirective, LeaderLineAnchorDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    CdkScrollableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
