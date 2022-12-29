import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityDemoComponent } from './accessibilitydemo.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: AccessibilityDemoComponent }])],
    exports: [RouterModule]
})
export class AccessibilityDemoRoutingModule {}
