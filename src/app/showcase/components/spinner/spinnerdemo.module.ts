import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'
import {FormsModule}  from '@angular/forms';;
import {SpinnerDemo} from './spinnerdemo';
import {SpinnerDemoRoutingModule} from './spinnerdemo-routing.module';
import {SpinnerModule} from 'primeng/spinner';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

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
