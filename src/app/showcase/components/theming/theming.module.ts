import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemingComponent} from './theming.component';
import {ThemingRoutingModule} from './theming-routing.module';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
  imports: [
    CommonModule,
    ThemingRoutingModule,
    AppCodeModule
  ],
  declarations: [
    ThemingComponent
  ]
})
export class ThemingModule {}