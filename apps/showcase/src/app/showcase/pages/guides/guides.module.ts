import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityDemoComponent } from './accessibility/accessibilitydemo.component';
import { GuidesRoutingModule } from './guides-routing.module';
import { TemplateUpdateDemoComponent } from './templateupdate/templateupdatedemo.component';
import { GuidesDocModule } from '@doc/guides/guidesdoc.module';
import { PrimeFlexDemoComponent } from './primeflex/primeflexdemo.component';
import { MigrationDemoComponent } from './migration/migration.component';

@NgModule({
    imports: [CommonModule, GuidesRoutingModule, GuidesDocModule],
    declarations: [AccessibilityDemoComponent, TemplateUpdateDemoComponent, PrimeFlexDemoComponent, MigrationDemoComponent]
})
export class GuidesModule {}
