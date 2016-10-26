import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordDemo} from './passworddemo';
import {PasswordDemoRoutingModule} from './passworddemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		PasswordDemoRoutingModule
	],
	declarations: [
		PasswordDemo
	]
})
export class PasswordDemoModule {}
