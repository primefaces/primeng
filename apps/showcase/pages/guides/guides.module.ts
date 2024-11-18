import { GuidesDocModule } from '@/doc/guides/guidesdoc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityDemoComponent } from './accessibility/accessibilitydemo.component';
import { GuidesRoutingModule } from './guides-routing.module';
import { MigrationDemoComponent } from './migration/migration.component';
import { PrimeFlexDemoComponent } from './primeflex/primeflexdemo.component';
import { TemplateUpdateDemoComponent } from './templateupdate/templateupdatedemo.component';

@NgModule({
    imports: [CommonModule, GuidesRoutingModule, GuidesDocModule],
    declarations: [AccessibilityDemoComponent, TemplateUpdateDemoComponent, PrimeFlexDemoComponent, MigrationDemoComponent]
})
export class GuidesModule {}
