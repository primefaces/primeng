import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldsetDemo} from './fieldsetdemo';
import {FieldsetDemoRoutingModule} from './fieldsetdemo-routing.module';
import {FieldsetModule} from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		FieldsetDemoRoutingModule,
        FieldsetModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		FieldsetDemo
	]
})
export class FieldsetDemoModule {}
