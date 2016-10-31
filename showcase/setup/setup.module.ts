import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SetupComponent} from './setup.component';
import {SetupRoutingModule} from './setup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SetupRoutingModule
  ],
  declarations: [
    SetupComponent
  ]
})
export class SetupModule {}