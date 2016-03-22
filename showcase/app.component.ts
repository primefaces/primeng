import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
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

@Component({
    selector: 'primeng-showcase',
    templateUrl: 'showcase/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'HomePage', component: HomePageComponent},
    {path: '/setup', name: 'Setup', component: SetupComponent},
    {path: '/theming', name: 'Theming', component: ThemingComponent},
    {path: '/inputtext', name: 'InputTextDemo', component: InputTextDemo},
    {path: '/button', name: 'ButtonDemo', component: ButtonDemo},
    {path: '/spinner', name: 'SpinnerDemo', component: SpinnerDemo},
    {path: '/panel', name: 'PanelDemo', component: PanelDemo},
    {path: '/fieldset', name: 'FieldsetDemo', component: FieldsetDemo},
    {path: '/rating', name: 'RatingDemo', component: RatingDemo},
    {path: '/password', name: 'PasswordDemo', component: PasswordDemo},
    {path: '/dialog', name: 'DialogDemo', component: DialogDemo},
    {path: '/togglebutton', name: 'ToggleButtonDemo', component: ToggleButtonDemo},
    {path: '/grid', name: 'GridDemo', component: GridDemo},
    {path: '/tabview', name: 'TabViewDemo', component: TabViewDemo},
    {path: '/radiobutton', name: 'RadioButtonDemo', component: RadioButtonDemo},
    {path: '/accordion', name: 'AccordionDemo', component: AccordionDemo},
    {path: '/inputtextarea', name: 'InputTextareaDemo', component: InputTextareaDemo},
    {path: '/galleria', name: 'GalleriaDemo', component: GalleriaDemo},
    {path: '/checkbox', name: 'CheckboxDemo', component: CheckboxDemo},
    {path: '/listbox', name: 'ListboxDemo', component: ListboxDemo},
    {path: '/messages', name: 'MessagesDemo', component: MessagesDemo},
    {path: '/growl', name: 'GrowlDemo', component: GrowlDemo},
    {path: '/carousel', name: 'CarouselDemo', component: CarouselDemo},
    {path: '/inputswitch', name: 'InputSwitchDemo', component: InputSwitchDemo},
    {path: '/selectbutton', name: 'SelectButtonDemo', component: SelectButtonDemo},
    {path: '/calendar', name: 'CalendarDemo', component: CalendarDemo},
    {path: '/dropdown', name: 'DropdownDemo', component: DropdownDemo},
    {path: '/progressbar', name: 'ProgressBarDemo', component: ProgressBarDemo},
    {path: '/piechart', name: 'PieChartDemo', component: PieChartDemo},
    {path: '/doughnutchart', name: 'DoughnutChartDemo', component: DoughnutChartDemo},
    {path: '/linechart', name: 'LineChartDemo', component: LineChartDemo},
    {path: '/barchart', name: 'BarChartDemo', component: BarChartDemo},
    {path: '/radarchart', name: 'RadarChartDemo', component: RadarChartDemo},
    {path: '/polarareachart', name: 'PolarAreaChartDemo', component: PolarAreaChartDemo},
    {path: '/menu', name: 'MenuDemo', component: MenuDemo},
    {path: '/tieredmenu', name: 'TieredMenuDemo', component: TieredMenuDemo},
    {path: '/menubar', name: 'MenubarDemo', component: MenubarDemo},
    {path: '/slidemenu', name: 'SlideMenuDemo', component: SlideMenuDemo},
    {path: '/breadcrumb', name: 'BreadcrumbDemo', component: BreadcrumbDemo},
    {path: '/slider', name: 'SliderDemo', component: SliderDemo},
    {path: '/lightbox', name: 'LightboxDemo', component: LightboxDemo},
    {path: '/paginator', name: 'PaginatorDemo', component: PaginatorDemo},
    {path: '/megamenu', name: 'MegaMenuDemo', component: MegaMenuDemo},
    {path: '/panelmenu', name: 'PanelMenuDemo', component: PanelMenuDemo},
    {path: '/datatable', name: 'DataTableDemo', component: DataTableDemo},
    {path: '/datatablefacets', name: 'DataTableFacetsDemo', component: DataTableFacetsDemo},
    {path: '/datatablepaginator', name: 'DataTablePaginatorDemo', component: DataTablePaginatorDemo},
    {path: '/datatablesort', name: 'DataTableSortDemo', component: DataTableSortDemo},
    {path: '/datatableresponsive', name: 'DataTableResponsiveDemo', component: DataTableResponsiveDemo},
    {path: '/datatableselection', name: 'DataTableSelectionDemo', component: DataTableSelectionDemo},
    {path: '/datatablefilter', name: 'DataTableFilterDemo', component: DataTableFilterDemo},
    {path: '/datatableeditable', name: 'DataTableEditableDemo', component: DataTableEditableDemo},
    {path: '/datatablecolresize', name: 'DataTableColResizeDemo', component: DataTableColResizeDemo},
    {path: '/datatablecolreorder', name: 'DataTableColReorderDemo', component: DataTableColReorderDemo},
    {path: '/datatablescroll', name: 'DataTableScrollDemo', component: DataTableScrollDemo},
    {path: '/datatablegroup', name: 'DataTableGroupDemo', component: DataTableGroupDemo},
    {path: '/datatablelazy', name: 'DataTableLazyDemo', component: DataTableLazyDemo},
    {path: '/datatablecrud', name: 'DataTableCrudDemo', component: DataTableCrudDemo},
    {path: '/datatabletemplating', name: 'DataTableTemplatingDemo', component: DataTableTemplatingDemo},
    {path: '/codehighlighter', name: 'CodeHighlighterDemo', component: CodeHighlighterDemo},
    {path: '/orderlist', name: 'OrderListDemo', component: OrderListDemo},
    {path: '/picklist', name: 'PickListDemo', component: PickListDemo},
    {path: '/schedule', name: 'ScheduleDemo', component: ScheduleDemo},
    {path: '/datagrid', name: 'DataGridDemo', component: DataGridDemo},
    {path: '/datalist', name: 'DataListDemo', component: DataListDemo},
    {path: '/datascroller', name: 'DataScrollerDemo', component: DataScrollerDemo},
    {path: '/datascrollerinline', name: 'DataScrollerInlineDemo', component: DataScrollerInlineDemo},
    {path: '/datascrollerloader', name: 'DataScrollerLoaderDemo', component: DataScrollerLoaderDemo},
    {path: '/datascrollerinfinite', name: 'DataScrollerInfiniteDemo', component: DataScrollerInfiniteDemo},
    {path: '/tree', name: 'TreeDemo', component: TreeDemo},
    {path: '/treetable', name: 'TreeTableDemo', component: TreeTableDemo},
    {path: '/terminal', name: 'TerminalDemo', component: TerminalDemo},
    {path: '/splitbutton', name: 'SplitButtonDemo', component: SplitButtonDemo},
    {path: '/overlaypanel', name: 'OverlayPanelDemo', component: OverlayPanelDemo},
    {path: '/autocomplete', name: 'AutoCompleteDemo', component: AutoCompleteDemo}
])
export class AppComponent {

    activeMenuId: string;

    themesVisible: boolean = false;

    mobileMenuActive: boolean = false;

    toggleMenu(e) {
        this.mobileMenuActive = !this.mobileMenuActive;
        e.preventDefault();
    }
}