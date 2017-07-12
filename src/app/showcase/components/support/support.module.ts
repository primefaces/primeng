import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupportComponent} from './support.component';
import {SupportRoutingModule} from './support-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SupportRoutingModule
  ],
  declarations: [
    SupportComponent
  ]
})
export class SupportModule {}