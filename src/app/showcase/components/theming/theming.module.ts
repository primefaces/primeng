import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemingComponent} from './theming.component';
import {ThemingRoutingModule} from './theming-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemingRoutingModule
  ],
  declarations: [
    ThemingComponent
  ]
})
export class ThemingModule {}