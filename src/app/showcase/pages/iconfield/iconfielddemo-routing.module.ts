import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconFieldDemo } from './iconfielddemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: IconFieldDemo }])],
    exports: [RouterModule]
})
export class IconFieldDemoRoutingModule {}
