import { Routes } from '@angular/router';
import { AccessibilityDemoComponent } from './accessibility/accessibilitydemo';
import { PassThroughDemoComponent } from './passthrough/passthroughdemo';
import { PrimeFlexDemoComponent } from './primeflex/primeflexdemo';
import { RTLDemoComponent } from './rtl/rtldemo';
import { TemplateUpdateDemoComponent } from './templateupdate/templateupdatedemo.component';

export default [
    { path: '', redirectTo: 'accessibility', pathMatch: 'full' },
    { path: 'accessibility', component: AccessibilityDemoComponent },
    { path: 'passthrough', component: PassThroughDemoComponent },
    { path: 'templateupdate', component: TemplateUpdateDemoComponent },
    { path: 'primeflex', component: PrimeFlexDemoComponent },
    { path: 'rtl', component: RTLDemoComponent },
    { path: 'passthrough', component: PassThroughDemoComponent }
] satisfies Routes;
