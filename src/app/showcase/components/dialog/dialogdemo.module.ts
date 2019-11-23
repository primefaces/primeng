import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogDemo} from './dialogdemo';
import {DialogDemoRoutingModule} from './dialogdemo-routing.module';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		DialogDemoRoutingModule,
        DialogModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		DialogDemo
	]
})
export class DialogDemoModule {}
