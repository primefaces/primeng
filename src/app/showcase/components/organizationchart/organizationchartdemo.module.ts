import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrganizationChartDemo} from './organizationchartdemo';
import {OrganizationChartDemoRoutingModule} from './organizationchartdemo-routing.module';
import {OrganizationChartModule} from '../../../components/organizationchart/organizationchart';
import {ToastModule} from '../../../components/toast/toast';
import {PanelModule} from '../../../components/panel/panel';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		OrganizationChartDemoRoutingModule,
        OrganizationChartModule,
        ToastModule,
        PanelModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		OrganizationChartDemo
	]
})
export class OrganizationChartDemoModule {}
