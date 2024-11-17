import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityDemoComponent } from './accessibility/accessibilitydemo.component';
import { TemplateUpdateDemoComponent } from './templateupdate/templateupdatedemo.component';
import { PrimeFlexDemoComponent } from './primeflex/primeflexdemo.component';
import { MigrationDemoComponent } from './migration/migration.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'accessibility', pathMatch: 'full' },
            { path: 'accessibility', component: AccessibilityDemoComponent },
            { path: 'templateupdate', component: TemplateUpdateDemoComponent },
            { path: 'primeflex', component: PrimeFlexDemoComponent },
            { path: 'migration', component: MigrationDemoComponent }
        ])
    ],
    exports: [RouterModule]
})
export class GuidesRoutingModule {}
