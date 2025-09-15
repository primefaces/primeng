import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityDemoComponent } from './accessibility/accessibilitydemo.component';
import { GuidesRoutingModule } from './guides-routing.module';
import { PrimeFlexDemoComponent } from './primeflex/primeflexdemo.component';
import { TemplateUpdateDemoComponent } from './templateupdate/templateupdatedemo.component';

@NgModule({
    imports: [CommonModule, GuidesRoutingModule, AccessibilityDemoComponent, TemplateUpdateDemoComponent, PrimeFlexDemoComponent]
})
export class GuidesModule {}
