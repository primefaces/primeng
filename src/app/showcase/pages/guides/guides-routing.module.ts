import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityDemoComponent } from './accessibility/accessibilitydemo.component';
import { TemplateUpdateDemoComponent } from './templateupdate/templateupdatedemo.component';
import { CssLayerDemoComponent } from './csslayer/csslayerdemo.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'accessibility', pathMatch: 'full' },
            { path: 'accessibility', component: AccessibilityDemoComponent },
            { path: 'templateupdate', component: TemplateUpdateDemoComponent },
            { path: 'csslayer', component: CssLayerDemoComponent }
        ])
    ],
    exports: [RouterModule]
})
export class GuidesRoutingModule {}
