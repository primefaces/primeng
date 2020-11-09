import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {I18NComponent} from './i18n.component';
import {I18NRoutingModule} from './i18n-routing.module';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
  imports: [
    CommonModule,
    AppCodeModule,
    I18NRoutingModule
  ],
  declarations: [
    I18NComponent
  ]
})
export class I18NModule {}