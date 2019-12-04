import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputGroupDemo} from './inputgroupdemo';
import {InputGroupDemoRoutingModule} from './inputgroupdemo-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		InputGroupDemoRoutingModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        RadioButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		InputGroupDemo
	]
})
export class InputGroupDemoModule {}
