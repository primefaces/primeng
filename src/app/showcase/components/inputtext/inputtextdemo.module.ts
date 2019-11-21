import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {InputTextDemo} from './inputtextdemo';
import {InputTextDemoRoutingModule} from './inputtextdemo-routing.module';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		InputTextDemoRoutingModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		InputTextDemo
	]
})
export class InputTextDemoModule {}
