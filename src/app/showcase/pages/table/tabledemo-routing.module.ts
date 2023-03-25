import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableDemo } from './tabledemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: TableDemo }])],
    exports: [RouterModule]
})
export class TableDemoRoutingModule {}
