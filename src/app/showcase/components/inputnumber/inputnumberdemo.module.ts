import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputNumberDemo} from './inputnumberdemo';
import {InputNumberDemoRoutingModule} from './inputnumberdemo-routing.module';
import {TabViewModule} from 'primeng/tabview';
import {InputNumberModule} from 'primeng/inputnumber';
import {AppInputStyleSwitchModule} from '../../app.inputstyleswitch.component';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		InputNumberDemoRoutingModule,
        InputNumberModule,
		TabViewModule,
		AppInputStyleSwitchModule,
		AppCodeModule
	],
	declarations: [
		InputNumberDemo
	]
})
export class InputNumberDemoModule {}
