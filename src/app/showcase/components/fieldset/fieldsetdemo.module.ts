import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FieldsetDemo} from './fieldsetdemo';
import {FieldsetDemoRoutingModule} from './fieldsetdemo-routing.module';
import {FieldsetModule} from '../../../components/fieldset/fieldset';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

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
