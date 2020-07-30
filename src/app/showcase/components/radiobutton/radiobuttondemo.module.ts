import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RadioButtonDemo} from './radiobuttondemo';
import {RadioButtonDemoRoutingModule} from './radiobuttondemo-routing.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabViewModule} from 'primeng/tabview';
import {AppInputStyleSwitchModule} from '../../app.inputstyleswitch.component';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		RadioButtonDemoRoutingModule,
        RadioButtonModule,
		TabViewModule,
		AppCodeModule,
		AppInputStyleSwitchModule
	],
	declarations: [
		RadioButtonDemo
	]
})
export class RadioButtonDemoModule {}
