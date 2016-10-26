import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesDemo} from './messagesdemo';
import {MessagesDemoRoutingModule} from './messagesdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		MessagesDemoRoutingModule
	],
	declarations: [
		MessagesDemo
	]
})
export class MessagesDemoModule {}
