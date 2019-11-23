import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditorDemo} from './editordemo';
import {EditorDemoRoutingModule} from './editordemo-routing.module';
import {EditorModule} from 'primeng/editor';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		EditorDemoRoutingModule,
        EditorModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		EditorDemo
	]
})
export class EditorDemoModule {}
