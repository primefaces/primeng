import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms'
import {HttpModule}    from '@angular/http';
import {Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';

import {SetupComponent} from './setup.component';
import {HomePageComponent} from './homepage.component';
import {ThemingComponent} from './theming.component';
import {InputTextDemo} from './demo/inputtext/inputtextdemo';
import {ButtonDemo} from './demo/button/buttondemo';
import {SpinnerDemo} from './demo/spinner/spinnerdemo';
import {PanelDemo} from './demo/panel/paneldemo';
import {FieldsetDemo} from './demo/fieldset/fieldsetdemo';
import {FileUploadDemo} from './demo/fileupload/fileuploaddemo';
import {RatingDemo} from './demo/rating/ratingdemo';
import {PasswordDemo} from './demo/password/passworddemo';
import {DialogDemo} from './demo/dialog/dialogdemo';
import {ToggleButtonDemo} from './demo/togglebutton/togglebuttondemo';
import {GridDemo} from './demo/grid/griddemo';
import {TabViewDemo} from './demo/tabview/tabviewdemo';
import {RadioButtonDemo} from './demo/radiobutton/radiobuttondemo';
import {AccordionDemo} from './demo/accordion/accordiondemo';
import {InputTextareaDemo} from './demo/inputtextarea/inputtextareademo';
import {GalleriaDemo} from './demo/galleria/galleriademo';
import {CheckboxDemo} from './demo/checkbox/checkboxdemo';
import {ListboxDemo} from './demo/listbox/listboxdemo';
import {MessagesDemo} from './demo/messages/messagesdemo';
import {GrowlDemo} from './demo/growl/growldemo';
import {CarouselDemo} from './demo/carousel/carouseldemo';
import {InputSwitchDemo} from './demo/inputswitch/inputswitchdemo';
import {SelectButtonDemo} from './demo/selectbutton/selectbuttondemo';
import {CalendarDemo} from './demo/calendar/calendardemo';
import {DropdownDemo} from './demo/dropdown/dropdowndemo';
import {ProgressBarDemo} from './demo/progressbar/progressbardemo';
import {ChartDemo} from './demo/chart/chartdemo';
import {PieChartDemo} from './demo/chart/piechart/piechartdemo';
import {DoughnutChartDemo} from './demo/chart/doughnutchart/doughnutchartdemo';
import {LineChartDemo} from './demo/chart/linechart/linechartdemo';
import {BarChartDemo} from './demo/chart/barchart/barchartdemo';
import {RadarChartDemo} from './demo/chart/radarchart/radarchartdemo';
import {PolarAreaChartDemo} from './demo/chart/polarareachart/polarareachartdemo';
import {MenuDemo} from './demo/menu/menudemo';
import {TieredMenuDemo} from './demo/tieredmenu/tieredmenudemo';
import {MenubarDemo} from './demo/menubar/menubardemo';
import {SlideMenuDemo} from './demo/slidemenu/slidemenudemo';
import {BreadcrumbDemo} from './demo/breadcrumb/breadcrumbdemo';
import {SliderDemo} from "./demo/slider/sliderdemo";
import {LightboxDemo} from "./demo/lightbox/lightboxdemo";
import {PaginatorDemo} from "./demo/paginator/paginatordemo";
import {MegaMenuDemo} from "./demo/megamenu/megamenudemo";
import {PanelMenuDemo} from "./demo/panelmenu/panelmenudemo";
import {DataTableDemo} from "./demo/datatable/datatabledemo";
import {DataTableEditableDemo} from "./demo/datatable/datatableeditabledemo";
import {DataTableFacetsDemo} from "./demo/datatable/datatablefacetsdemo";
import {DataTablePaginatorDemo} from "./demo/datatable/datatablepaginatordemo";
import {DataTableSortDemo} from "./demo/datatable/datatablesortdemo";
import {DataTableResponsiveDemo} from "./demo/datatable/datatableresponsivedemo";
import {DataTableSelectionDemo} from "./demo/datatable/datatableselectiondemo";
import {DataTableFilterDemo} from "./demo/datatable/datatablefilterdemo";
import {DataTableColResizeDemo} from "./demo/datatable/datatablecolresizedemo";
import {DataTableColReorderDemo} from "./demo/datatable/datatablecolreorderdemo";
import {DataTableScrollDemo} from "./demo/datatable/datatablescrolldemo";
import {DataTableGroupDemo} from "./demo/datatable/datatablegroupdemo";
import {DataTableCrudDemo} from "./demo/datatable/datatablecruddemo";
import {DataTableLazyDemo} from "./demo/datatable/datatablelazydemo";
import {DataTableTemplatingDemo} from "./demo/datatable/datatabletemplatingdemo";
import {DataTableCMDemo} from "./demo/datatable/datatablecmdemo";
import {DataTableColTogglerDemo} from "./demo/datatable/datatablecoltogglerdemo";
import {DataTableRowExpansionDemo} from "./demo/datatable/datatablerowexpansiondemo";
import {DataTableSubmenu} from "./demo/datatable/datatablesubmenu";
import {CodeHighlighterDemo} from "./demo/codehighlighter/codehighlighterdemo";
import {OrderListDemo} from "./demo/orderlist/orderlistdemo";
import {PickListDemo} from "./demo/picklist/picklistdemo";
import {ScheduleDemo} from "./demo/schedule/scheduledemo";
import {DataGridDemo} from "./demo/datagrid/datagriddemo";
import {DataListDemo} from "./demo/datalist/datalistdemo";
import {DataScrollerDemo} from "./demo/datascroller/datascrollerdemo";
import {DataScrollerInlineDemo} from "./demo/datascroller/datascrollerinlinedemo";
import {DataScrollerLoaderDemo} from "./demo/datascroller/datascrollerloaderdemo";
import {DataScrollerInfiniteDemo} from "./demo/datascroller/datascrollerinfinitedemo";
import {DataScrollerSubMenu} from "./demo/datascroller/datascrollersubmenu";
import {TreeDemo} from "./demo/tree/treedemo";
import {TreeTableDemo} from "./demo/treetable/treetabledemo";
import {TerminalDemo} from "./demo/terminal/terminaldemo";
import {SplitButtonDemo} from "./demo/splitbutton/splitbuttondemo";
import {OverlayPanelDemo} from "./demo/overlaypanel/overlaypaneldemo";
import {AutoCompleteDemo} from "./demo/autocomplete/autocompletedemo";
import {EditorDemo} from "./demo/editor/editordemo";
import {ResponsiveDemo} from "./demo/responsive/responsivedemo";
import {MultiSelectDemo} from "./demo/multiselect/multiselectdemo";
import {GMapDemo} from "./demo/gmap/gmapdemo";
import {ContextMenuDemo} from "./demo/contextmenu/contextmenudemo";
import {DragDropDemo} from "./demo/dragdrop/dragdropdemo";
import {ToolbarDemo} from "./demo/toolbar/toolbardemo";
import {ValidationDemo} from "./demo/validation/validationdemo";
import {DataTableExportDemo} from "./demo/datatable/datatableexportdemo";
import {TabMenuDemo} from "./demo/tabmenu/tabmenudemo";
import {TooltipDemo} from "./demo/tooltip/tooltipdemo";
import {MenuModelApi} from "./demo/menumodel/menumodelapi";
import {InputMaskDemo} from "./demo/inputmask/inputmaskdemo";
import {CarService} from './demo/service/carservice';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';

import {AccordionModule} from '../components/accordion/accordion';
import {AutoCompleteModule} from '../components/autocomplete/autocomplete';
import {BreadcrumbModule} from '../components/breadcrumb/breadcrumb';
import {ButtonModule} from '../components/button/button';
import {CalendarModule} from '../components/calendar/calendar';
import {CarouselModule} from '../components/carousel/carousel';
import {ChartModule} from '../components/chart/chart';
import {CheckboxModule} from '../components/checkbox/checkbox';
import {CodeHighlighterModule} from '../components/codehighlighter/codehighlighter';
import {SharedModule} from '../components/common/shared';
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
import {TabMenuModule} from '../components/tabmenu/tabmenu';
import {TabViewModule} from '../components/tabview/tabview';
import {TerminalModule} from '../components/terminal/terminal';
import {TieredMenuModule} from '../components/tieredmenu/tieredmenu';
import {ToggleButtonModule} from '../components/togglebutton/togglebutton';
import {ToolbarModule} from '../components/toolbar/toolbar';
import {TooltipModule} from '../components/tooltip/tooltip';
import {TreeModule} from '../components/tree/tree';
import {TreeTableModule} from '../components/treetable/treetable';

@Component({
    selector: 'primeng-showcase',
    templateUrl: 'showcase/app.component.html'
})
export class AppComponent {

    activeMenuId: string;

    themesVisible: boolean = false;

    mobileMenuActive: boolean = false;

    toggleMenu(e) {
        this.mobileMenuActive = !this.mobileMenuActive;
        e.preventDefault();
    }
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutes,
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
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
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
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule
    ],
    declarations: [
        AppComponent,
        SetupComponent,
        HomePageComponent,
        ThemingComponent,
        InputTextDemo,
        ButtonDemo,
        SpinnerDemo,
        PanelDemo,
        FieldsetDemo,
        FileUploadDemo,
        RatingDemo,
        PasswordDemo,
        DialogDemo,
        ToggleButtonDemo,
        GridDemo,
        TabViewDemo,
        RadioButtonDemo,
        AccordionDemo,
        InputTextareaDemo,
        GalleriaDemo,
        CheckboxDemo,
        ListboxDemo,
        MessagesDemo,
        GrowlDemo,
        CarouselDemo,
        InputSwitchDemo,
        SelectButtonDemo,
        CalendarDemo,
        DropdownDemo,
        ProgressBarDemo,
        ChartDemo,
        PieChartDemo,
        DoughnutChartDemo,
        LineChartDemo,
        BarChartDemo,
        RadarChartDemo,
        PolarAreaChartDemo,
        MenuDemo,
        TieredMenuDemo,
        MenubarDemo,
        SlideMenuDemo,
        BreadcrumbDemo,
        SliderDemo,
        LightboxDemo,
        PaginatorDemo,
        MegaMenuDemo,
        PanelMenuDemo,
        DataTableDemo,
        DataTableEditableDemo,
        DataTableFacetsDemo,
        DataTablePaginatorDemo,
        DataTableSortDemo,
        DataTableResponsiveDemo,
        DataTableSelectionDemo,
        DataTableFilterDemo,
        DataTableColResizeDemo,
        DataTableColReorderDemo,
        DataTableScrollDemo,
        DataTableGroupDemo,
        DataTableCrudDemo,
        DataTableLazyDemo,
        DataTableTemplatingDemo,
        DataTableCMDemo,
        DataTableColTogglerDemo,
        DataTableRowExpansionDemo,
        DataTableSubmenu,
        CodeHighlighterDemo,
        OrderListDemo,
        PickListDemo,
        ScheduleDemo,
        DataGridDemo,
        DataListDemo,
        DataScrollerDemo,
        DataScrollerInlineDemo,
        DataScrollerLoaderDemo,
        DataScrollerInfiniteDemo,
        DataScrollerSubMenu,
        TreeDemo,
        TreeTableDemo,
        TerminalDemo,
        SplitButtonDemo,
        OverlayPanelDemo,
        AutoCompleteDemo,
        EditorDemo,
        ResponsiveDemo,
        MultiSelectDemo,
        GMapDemo,
        ContextMenuDemo,
        DragDropDemo,
        ToolbarDemo,
        ValidationDemo,
        DataTableExportDemo,
        TabMenuDemo,
        TooltipDemo,
        MenuModelApi,
        InputMaskDemo
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CarService,CountryService,EventService,NodeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);