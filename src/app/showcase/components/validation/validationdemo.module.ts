import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {ValidationDemo} from './validationdemo';
import {ValidationDemoRoutingModule} from './validationdemo-routing.module';
import {ToastModule} from 'primeng/toast';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
        ReactiveFormsModule,
		ValidationDemoRoutingModule,
        ToastModule,
        MessageModule,
        PanelModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ValidationDemo
	]
})
export class ValidationDemoModule {}
