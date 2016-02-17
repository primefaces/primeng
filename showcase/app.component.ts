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
import {SelectbuttonDemo} from './demo/selectbutton/selectbuttondemo';
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
    {path: '/selectbutton', name: 'SelectbuttonDemo', component: SelectbuttonDemo},
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
    {path: '/megamenu', name: 'MegaMenuDemo', component: MegaMenuDemo}
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