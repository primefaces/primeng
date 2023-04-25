import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationChartDocModule } from '../../doc/organizationchart/organizationchartdoc.module';
import { OrganizationChartDemo } from './organizationchartdemo';
import { OrganizationChartDemoRoutingModule } from './organizationchartdemo-routing.module';

@NgModule({
    imports: [CommonModule, OrganizationChartDemoRoutingModule, OrganizationChartDocModule],
    declarations: [OrganizationChartDemo]
})
export class OrganizationChartDemoModule {}
