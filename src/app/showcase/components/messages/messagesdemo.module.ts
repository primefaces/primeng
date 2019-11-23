import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesDemo} from './messagesdemo';
import {MessagesDemoRoutingModule} from './messagesdemo-routing.module';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		MessagesDemoRoutingModule,
        MessagesModule,
        MessageModule,
        ButtonModule,
        InputTextModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		MessagesDemo
	]
})
export class MessagesDemoModule {}
