import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TailwindDemo } from './tailwinddemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: TailwindDemo }])],
    exports: [RouterModule],
})
export class TailwindDemoRoutingModule {}
