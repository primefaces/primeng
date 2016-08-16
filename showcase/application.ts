import {NgModule} from '@angular/core';
import {FormsModule}    from '@angular/forms'
import {HttpModule}    from '@angular/http';
import {Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppRoutes} from './app.routes';

import {SetupComponent} from './setup.component';
import {HomePageComponent} from './homepage.component';
import {ThemingComponent} from './theming.component';
import {InputTextDemo} from './demo/inputtext/inputtextdemo';
import {ButtonDemo} from './demo/button/buttondemo';
import {SpinnerDemo} from './demo/spinner/spinnerdemo';
import {PanelDemo} from './demo/panel/paneldemo';
import {FieldsetDemo} from './demo/fieldset/fieldsetdemo';
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
        AppRoutes,
        HttpModule
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
        CarService,CountryService,EventService,NodeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);