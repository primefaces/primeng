import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityDemoRoutingModule } from './accessibilitydemo-routing.module';
import { AccessibilityDemoComponent } from './accessibilitydemo.component';
import { AppCodeModule } from '../../app.code.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  imports: [
    CommonModule,
    CheckboxModule,
    AccessibilityDemoRoutingModule,
    AppCodeModule
  ],
  declarations: [AccessibilityDemoComponent],
})
export class AccessibilityDemoModule { }