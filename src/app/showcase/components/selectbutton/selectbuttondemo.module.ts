import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SelectButtonDemo} from './selectbuttondemo';
import {SelectButtonDemoRoutingModule} from './selectbuttondemo-routing.module';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		SelectButtonDemoRoutingModule,
        FormsModule,
        SelectButtonModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		SelectButtonDemo
	]
})
export class SelectButtonDemoModule {}
