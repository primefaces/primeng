import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbDemo } from './breadcrumbdemo';
import { BreadcrumbDemoRoutingModule } from './breadcrumbdemo-routing.module';
import { BreadcrumbDocModule } from '../../doc/breadcrumb/breadcrumbdoc.module';

@NgModule({
    imports: [CommonModule, BreadcrumbDemoRoutingModule, BreadcrumbDocModule],
    declarations: [BreadcrumbDemo]
})
export class BreadcrumbDemoModule {}
