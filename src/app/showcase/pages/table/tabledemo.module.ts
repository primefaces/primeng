import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableDemo } from './tabledemo';
import { TableDemoRoutingModule } from './tabledemo-routing.module';
import { TableDocModule } from '../../doc/table/tabledoc.module';

@NgModule({
    imports: [CommonModule, TableDemoRoutingModule, TableDocModule],
    declarations: [TableDemo]
})
export class TableDemoModule {}
