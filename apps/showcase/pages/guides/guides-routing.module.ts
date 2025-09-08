import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityDemoComponent } from './accessibility/accessibilitydemo.component';
import { PrimeFlexDemoComponent } from './primeflex/primeflexdemo.component';
import { TemplateUpdateDemoComponent } from './templateupdate/templateupdatedemo.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'accessibility', pathMatch: 'full' },
            { path: 'accessibility', component: AccessibilityDemoComponent },
            { path: 'templateupdate', component: TemplateUpdateDemoComponent },
            { path: 'primeflex', component: PrimeFlexDemoComponent }
        ])
    ],
    exports: [RouterModule]
})
export class GuidesRoutingModule {}
