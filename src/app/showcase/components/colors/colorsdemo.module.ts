import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorsDemoComponent} from './colors.component';
import {ColorsDemoRoutingModule} from './colors-routing.module';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
  imports: [
    CommonModule,
    AppCodeModule,
    ColorsDemoRoutingModule
  ],
  declarations: [
    ColorsDemoComponent
  ]
})
export class ColorsDemoModule {}