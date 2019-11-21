import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {TriStateCheckboxDemo} from './tristatecheckboxdemo';
import {TriStateCheckboxDemoRoutingModule} from './tristatecheckboxdemo-routing.module';
import {TriStateCheckboxModule} from '../../../components/tristatecheckbox/tristatecheckbox';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		TriStateCheckboxDemoRoutingModule,
        TriStateCheckboxModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		TriStateCheckboxDemo
	]
})
export class TriStateCheckboxDemoModule {}
