import { Routes } from '@angular/router';
import { AccessibilityDemoComponent } from './accessibility/accessibilitydemo.component';
import { PrimeFlexDemoComponent } from './primeflex/primeflexdemo.component';
import { RTLDemoComponent } from './rtl/rtldemo.component';
import { TemplateUpdateDemoComponent } from './templateupdate/templateupdatedemo.component';

export default [
    { path: '', redirectTo: 'accessibility', pathMatch: 'full' },
    { path: 'accessibility', component: AccessibilityDemoComponent },
    { path: 'templateupdate', component: TemplateUpdateDemoComponent },
    { path: 'primeflex', component: PrimeFlexDemoComponent },
    { path: 'rtl', component: RTLDemoComponent }
] satisfies Routes;
