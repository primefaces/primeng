import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {ScheduleDemo} from './scheduledemo';
import {ScheduleDemoRoutingModule} from './scheduledemo-routing.module';
import {ScheduleModule} from '../../../components/schedule/schedule';
import {DialogModule} from '../../../components/dialog/dialog';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {InputMaskModule} from '../../../components/inputmask/inputmask';
import {CheckboxModule} from '../../../components/checkbox/checkbox';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		ScheduleDemoRoutingModule,
        ScheduleModule,
        DialogModule,
        InputTextModule,
        InputMaskModule,
        CheckboxModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ScheduleDemo
	]
})
export class ScheduleDemoModule {}
