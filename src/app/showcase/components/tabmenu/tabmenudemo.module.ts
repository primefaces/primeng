import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabMenuDemo, InfoComponent, MessageComponent} from './tabmenudemo';
import {TabMenuDemoRoutingModule} from './tabmenudemo-routing.module';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		TabMenuDemoRoutingModule,
        TabMenuModule,
		TabViewModule,
		MessageModule,
        CodeHighlighterModule
	],
	declarations: [
		TabMenuDemo,
		InfoComponent,
		MessageComponent
	]
})
export class TabMenuDemoModule {}
