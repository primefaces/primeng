import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityDocModule } from '../../doc/accessibility/accessibilitydoc.module';
import { AccessibilityDemoRoutingModule } from './accessibilitydemo-routing.module';
import { AccessibilityDemoComponent } from './accessibilitydemo.component';

@NgModule({
    imports: [CommonModule, AccessibilityDemoRoutingModule, AccessibilityDocModule],
    declarations: [AccessibilityDemoComponent]
})
export class AccessibilityDemoModule {}
