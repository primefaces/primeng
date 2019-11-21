import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms';
import {ValidationDemo} from './validationdemo';
import {ValidationDemoRoutingModule} from './validationdemo-routing.module';
import {ToastModule} from '../../../components/toast/toast';
import {MessageModule} from '../../../components/message/message';
import {PanelModule} from '../../../components/panel/panel';
import {DropdownModule} from '../../../components/dropdown/dropdown';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {InputTextareaModule} from '../../../components/inputtextarea/inputtextarea';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

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
