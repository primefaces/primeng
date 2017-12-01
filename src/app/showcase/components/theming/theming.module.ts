import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemingComponent} from './theming.component';
import {ThemingRoutingModule} from './theming-routing.module';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
  imports: [
    CommonModule,
    ThemingRoutingModule,
    CodeHighlighterModule
  ],
  declarations: [
    ThemingComponent
  ]
})
export class ThemingModule {}