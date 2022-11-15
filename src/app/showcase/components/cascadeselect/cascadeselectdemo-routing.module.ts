import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CascadeSelectDemo } from './cascadeselectdemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: CascadeSelectDemo }])],
    exports: [RouterModule]
})
export class CascadeSelectDemoRoutingModule {}
