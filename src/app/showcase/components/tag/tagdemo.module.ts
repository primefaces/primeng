import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagDemo} from './tagdemo';
import {TagDemoRoutingModule} from './tagdemo-routing.module';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import { TagModule } from 'primeng/tag';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
		TagDemoRoutingModule,
        ButtonModule,
        PanelModule,
		TabViewModule,
		TagModule,
		AppCodeModule,
		AppDemoActionsModule
	],
	declarations: [
		TagDemo
	]
})
export class TagDemoModule {}
