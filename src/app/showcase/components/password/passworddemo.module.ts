import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordDemo} from './passworddemo';
import {PasswordDemoRoutingModule} from './passworddemo-routing.module';
import {PasswordModule} from '../../../components/password/password';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		PasswordDemoRoutingModule,
        PasswordModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		PasswordDemo
	]
})
export class PasswordDemoModule {}
