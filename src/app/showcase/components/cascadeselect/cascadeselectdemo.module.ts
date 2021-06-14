import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CascadeSelectDemo} from './cascadeselectdemo';
import {CascadeSelectDemoRoutingModule} from './cascadeselectdemo-routing.module';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {FormsModule} from '@angular/forms';
import { AppDemoActionsModule } from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		CascadeSelectDemoRoutingModule,
        ButtonModule,
        PanelModule,
		TabViewModule,
		CascadeSelectModule,
		FormsModule,
		AppDemoActionsModule,
		AppCodeModule
	],
	declarations: [
		CascadeSelectDemo
	]
})
export class CascadeSelectDemoModule {}
