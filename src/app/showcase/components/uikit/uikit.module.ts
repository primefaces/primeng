import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UIKitComponent} from './uikit.component';
import {UIKitRoutingModule} from './uikit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UIKitRoutingModule
  ],
  declarations: [
    UIKitComponent
  ]
})
export class UIKitModule {}