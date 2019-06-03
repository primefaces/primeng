import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {DialogModule} from '../../../components/dialog/dialog';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {ButtonModule} from '../../../components/button/button';
import {AccordionModule} from '../../../components/accordion/accordion';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';
import { FocusTrapDemoRoutingModule } from './focustrapdemo-routing.module';
import { FocusTrapDemo } from './focustrapdemo';
import { AutoCompleteModule } from 'src/app/components/autocomplete/autocomplete';
import { CalendarModule } from 'src/app/components/calendar/calendar';
import { MultiSelectModule } from 'src/app/components/multiselect/multiselect';
import { DropdownModule } from 'src/app/components/dropdown/dropdown';
import { EditorModule } from 'src/app/components/editor/editor';
import { FocusTrapModule } from 'src/app/components/focustrap/focustrap';

@NgModule({
	imports: [
		CommonModule,
		FocusTrapDemoRoutingModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        AccordionModule,
        TabViewModule,
        CodeHighlighterModule,
        FocusTrapModule,
		AutoCompleteModule,
		CalendarModule,
		MultiSelectModule,
		DropdownModule,
		EditorModule
	],
	declarations: [
		FocusTrapDemo
	]
})
export class FocusTrapDemoModule {}
