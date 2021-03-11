import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PasswordDemo} from './passworddemo';
import {PasswordDemoRoutingModule} from './passworddemo-routing.module';
import {PasswordModule} from 'primeng/password';
import {TabViewModule} from 'primeng/tabview';
import {DividerModule} from 'primeng/divider';
import {AppInputStyleSwitchModule} from '../../app.inputstyleswitch.component';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		PasswordDemoRoutingModule,
        PasswordModule,
		DividerModule,
		TabViewModule,
		FormsModule,
		AppInputStyleSwitchModule,
		AppCodeModule
	],
	declarations: [
		PasswordDemo
	]
})
export class PasswordDemoModule {}
