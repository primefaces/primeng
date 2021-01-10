import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputSwitchDemo} from './inputswitchdemo';
import {InputSwitchDemoRoutingModule} from './inputswitchdemo-routing.module';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		InputSwitchDemoRoutingModule,
        InputSwitchModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		InputSwitchDemo
	]
})
export class InputSwitchDemoModule {}
