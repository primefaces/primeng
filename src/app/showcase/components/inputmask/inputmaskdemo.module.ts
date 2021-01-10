import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputMaskDemo} from './inputmaskdemo';
import {InputMaskDemoRoutingModule} from './inputmaskdemo-routing.module';
import {InputMaskModule} from 'primeng/inputmask';
import {TabViewModule} from 'primeng/tabview';
import {AppInputStyleSwitchModule} from '../../app.inputstyleswitch.component';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		InputMaskDemoRoutingModule,
        InputMaskModule,
        TabViewModule,
		AppInputStyleSwitchModule,
		AppCodeModule
	],
	declarations: [
		InputMaskDemo
	]
})
export class InputMaskDemoModule {}
