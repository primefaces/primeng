import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common'
import {FormsModule}  from '@angular/forms';;
import {SpinnerDemo} from './spinnerdemo';
import {SpinnerDemoRoutingModule} from './spinnerdemo-routing.module';
import {SpinnerModule} from '../../../components/spinner/spinner';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		SpinnerDemoRoutingModule,
        SpinnerModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		SpinnerDemo
	]
})
export class SpinnerDemoModule {}
