import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TriStateCheckboxDemo} from './tristatecheckboxdemo';
import {TriStateCheckboxDemoRoutingModule} from './tristatecheckboxdemo-routing.module';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {TabViewModule} from 'primeng/tabview';
import {AppInputStyleSwitchModule} from '../../app.inputstyleswitch.component';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		TriStateCheckboxDemoRoutingModule,
        TriStateCheckboxModule,
		TabViewModule,
		AppInputStyleSwitchModule,
		AppCodeModule
	],
	declarations: [
		TriStateCheckboxDemo
	]
})
export class TriStateCheckboxDemoModule {}
