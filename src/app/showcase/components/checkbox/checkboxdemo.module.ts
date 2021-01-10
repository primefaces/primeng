import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CheckboxDemo} from './checkboxdemo';
import {CheckboxDemoRoutingModule} from './checkboxdemo-routing.module';
import {CheckboxModule} from 'primeng/checkbox';
import {TabViewModule} from 'primeng/tabview';
import { AppInputStyleSwitchModule } from '../../app.inputstyleswitch.component';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		CheckboxDemoRoutingModule,
        CheckboxModule,
		AppInputStyleSwitchModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		CheckboxDemo
	]
})
export class CheckboxDemoModule {}
