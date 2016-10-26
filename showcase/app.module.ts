import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms'
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomePageComponent} from './homepage.component';

import {CarService} from './demo/service/carservice';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';

import {AccordionModule} from '../components/accordion/accordion';
import {AutoCompleteModule} from '../components/autocomplete/autocomplete';
import {BreadcrumbModule} from '../components/breadcrumb/breadcrumb';
import {BlockUIModule} from '../components/blockui/blockui';
import {ButtonModule} from '../components/button/button';
import {CalendarModule} from '../components/calendar/calendar';
import {CarouselModule} from '../components/carousel/carousel';
import {ChartModule} from '../components/chart/chart';
import {CheckboxModule} from '../components/checkbox/checkbox';
import {CodeHighlighterModule} from '../components/codehighlighter/codehighlighter';
import {SharedModule} from '../components/common/shared';
import {ConfirmDialogModule} from '../components/confirmdialog/confirmdialog';
import {ContextMenuModule} from '../components/contextmenu/contextmenu';
import {DataGridModule} from '../components/datagrid/datagrid';
import {DataListModule} from '../components/datalist/datalist';
import {DataScrollerModule} from '../components/datascroller/datascroller';
import {DataTableModule} from '../components/datatable/datatable';
import {DialogModule} from '../components/dialog/dialog';
import {DragDropModule} from '../components/dragdrop/dragdrop';
import {DropdownModule} from '../components/dropdown/dropdown';
import {EditorModule} from '../components/editor/editor';
import {FieldsetModule} from '../components/fieldset/fieldset';
import {FileUploadModule} from '../components/fileupload/fileupload';
import {GalleriaModule} from '../components/galleria/galleria';
import {GMapModule} from '../components/gmap/gmap';
import {GrowlModule} from '../components/growl/growl';
import {InplaceModule} from '../components/inplace/inplace';
import {InputMaskModule} from '../components/inputmask/inputmask';
import {InputSwitchModule} from '../components/inputswitch/inputswitch';
import {InputTextModule} from '../components/inputtext/inputtext';
import {InputTextareaModule} from '../components/inputtextarea/inputtextarea';
import {LightboxModule} from '../components/lightbox/lightbox';
import {ListboxModule} from '../components/listbox/listbox';
import {MegaMenuModule} from '../components/megamenu/megamenu';
import {MenuModule} from '../components/menu/menu';
import {MenubarModule} from '../components/menubar/menubar';
import {MessagesModule} from '../components/messages/messages';
import {MultiSelectModule} from '../components/multiselect/multiselect';
import {OrderListModule} from '../components/orderlist/orderlist';
import {OverlayPanelModule} from '../components/overlaypanel/overlaypanel';
import {PaginatorModule} from '../components/paginator/paginator';
import {PanelModule} from '../components/panel/panel';
import {PanelMenuModule} from '../components/panelmenu/panelmenu';
import {PasswordModule} from '../components/password/password';
import {PickListModule} from '../components/picklist/picklist';
import {ProgressBarModule} from '../components/progressbar/progressbar';
import {RadioButtonModule} from '../components/radiobutton/radiobutton';
import {RatingModule} from '../components/rating/rating';
import {ScheduleModule} from '../components/schedule/schedule';
import {SelectButtonModule} from '../components/selectbutton/selectbutton';
import {SlideMenuModule} from '../components/slidemenu/slidemenu';
import {SliderModule} from '../components/slider/slider';
import {SpinnerModule} from '../components/spinner/spinner';
import {SplitButtonModule} from '../components/splitbutton/splitbutton';
import {StepsModule} from '../components/steps/steps';
import {TabMenuModule} from '../components/tabmenu/tabmenu';
import {TabViewModule} from '../components/tabview/tabview';
import {TerminalModule} from '../components/terminal/terminal';
import {TieredMenuModule} from '../components/tieredmenu/tieredmenu';
import {ToggleButtonModule} from '../components/togglebutton/togglebutton';
import {ToolbarModule} from '../components/toolbar/toolbar';
import {TooltipModule} from '../components/tooltip/tooltip';
import {TreeModule} from '../components/tree/tree';
import {TreeTableModule} from '../components/treetable/treetable';
import {TriStateCheckboxModule} from '../components/tristatecheckbox/tristatecheckbox';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        CodeHighlighterModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        ConfirmDialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScheduleModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        TriStateCheckboxModule,
        BlockUIModule
    ],
    declarations: [
        AppComponent,
        HomePageComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CarService,CountryService,EventService,NodeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }