import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToggleSwitchDemo } from './toggleswitchdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ToggleSwitchDemo }])],
    exports: [RouterModule]
})
export class ToggleSwitchDemoRoutingModule {}
