import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ResponsiveDemo} from './responsivedemo';
import {ResponsiveDemoRoutingModule} from './responsivedemo-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {ListboxModule} from 'primeng/listbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DialogModule} from 'primeng/dialog';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {CarouselModule} from 'primeng/carousel';
import {OrderListModule} from 'primeng/orderlist';
import {PickListModule} from 'primeng/picklist';
import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TabViewModule} from 'primeng/tabview';
import {TreeModule} from 'primeng/tree';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		ResponsiveDemoRoutingModule,
        InputTextModule,
        InputTextareaModule,
        CalendarModule,
        AutoCompleteModule,
        SplitButtonModule,
        ButtonModule,
        PasswordModule,
        DropdownModule,
        ListboxModule,
        RadioButtonModule,
        DialogModule,
        PanelModule,
        TableModule,
        CarouselModule,
        OrderListModule,
        PickListModule,
        MenuModule,
        PanelMenuModule,
        TreeModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ResponsiveDemo
	]
})
export class ResponsiveDemoModule {}
