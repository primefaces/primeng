import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {ResponsiveDemo} from './responsivedemo';
import {ResponsiveDemoRoutingModule} from './responsivedemo-routing.module';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {InputTextareaModule} from '../../../components/inputtextarea/inputtextarea';
import {CalendarModule} from '../../../components/calendar/calendar';
import {AutoCompleteModule} from '../../../components/autocomplete/autocomplete';
import {ButtonModule} from '../../../components/button/button';
import {SplitButtonModule} from '../../../components/splitbutton/splitbutton';
import {DropdownModule} from '../../../components/dropdown/dropdown';
import {PasswordModule} from '../../../components/password/password';
import {ListboxModule} from '../../../components/listbox/listbox';
import {RadioButtonModule} from '../../../components/radiobutton/radiobutton';
import {DialogModule} from '../../../components/dialog/dialog';
import {PanelModule} from '../../../components/panel/panel';
import {DataTableModule} from '../../../components/datatable/datatable';
import {DataGridModule} from '../../../components/datagrid/datagrid';
import {CarouselModule} from '../../../components/carousel/carousel';
import {OrderListModule} from '../../../components/orderlist/orderlist';
import {PickListModule} from '../../../components/picklist/picklist';
import {MenuModule} from '../../../components/menu/menu';
import {PanelMenuModule} from '../../../components/panelmenu/panelmenu';
import {TabViewModule} from '../../../components/tabview/tabview';
import {TreeModule} from '../../../components/tree/tree';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

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
        PasswordModule,
        DropdownModule,
        ListboxModule,
        RadioButtonModule,
        DialogModule,
        PanelModule,
        DataTableModule,
        DataGridModule,
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
