import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SetupComponent} from './setup.component';
import {SetupRoutingModule} from './setup-routing.module';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
  imports: [
    CommonModule,
    AppCodeModule,
    SetupRoutingModule
  ],
  declarations: [
    SetupComponent
  ]
})
export class SetupModule {}