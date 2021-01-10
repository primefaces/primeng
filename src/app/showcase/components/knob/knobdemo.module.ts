import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KnobDemo} from './knobdemo';
import {KnobDemoRoutingModule} from './knobdemo-routing.module';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {KnobModule} from 'primeng/knob';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		KnobDemoRoutingModule,
        ButtonModule,
        PanelModule,
		TabViewModule,
		FormsModule,
		KnobModule,
		AppCodeModule
	],
	declarations: [
		KnobDemo
	]
})
export class KnobDemoModule {}
