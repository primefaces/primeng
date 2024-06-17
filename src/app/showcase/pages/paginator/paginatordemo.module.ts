import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginatorDocModule } from '@doc/paginator/paginatordoc.module';
import { PaginatorDemo } from './paginatordemo';
import { PaginatorDemoRoutingModule } from './paginatordemo-routing.module';

@NgModule({
    imports: [CommonModule, PaginatorDemoRoutingModule, PaginatorDocModule],
    declarations: [PaginatorDemo]
})
export class PaginatorDemoModule {}
