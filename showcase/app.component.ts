import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomePageComponent} from './homepage.component';
import {ThemingComponent} from './theming.component';
import {InputTextDemoComponent} from './demo/inputtext/inputtextdemo.component';
import {ButtonDemoComponent} from './demo/button/buttondemo.component';
import {SpinnerDemoComponent} from './demo/spinner/spinnerdemo.component';
import {PanelDemoComponent} from './demo/panel/paneldemo.component';
import {FieldsetDemoComponent} from './demo/fieldset/fieldsetdemo.component';
import {RatingDemoComponent} from './demo/rating/ratingdemo.component';
import {PasswordDemoComponent} from './demo/password/passworddemo.component';
import {DialogDemoComponent} from './demo/dialog/dialogdemo.component';
import {ToggleButtonDemoComponent} from './demo/togglebutton/togglebuttondemo.component';
import {GridDemoComponent} from './demo/grid/griddemo.component';
import {TabViewDemoComponent} from './demo/tabview/tabviewdemo.component';
import {RadioButtonDemoComponent} from './demo/radiobutton/radiobuttondemo.component';
import {AccordionDemoComponent} from './demo/accordion/accordiondemo.component';
import {InputTextareaDemoComponent} from './demo/inputtextarea/inputtextareademo.component';
import {GalleriaDemoComponent} from './demo/galleria/galleriademo.component';
import {CheckboxDemoComponent} from './demo/checkbox/checkboxdemo.component';

@Component({
    selector: 'my-app',
    templateUrl: 'showcase/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'HomePage', component: HomePageComponent},
    {path: '/theming', name: 'Theming', component: ThemingComponent},
    {path: '/inputtext', name: 'InputTextDemo', component: InputTextDemoComponent},
    {path: '/button', name: 'ButtonDemo', component: ButtonDemoComponent},
    {path: '/spinner', name: 'SpinnerDemo', component: SpinnerDemoComponent},
    {path: '/panel', name: 'PanelDemo', component: PanelDemoComponent},
    {path: '/fieldset', name: 'FieldsetDemo', component: FieldsetDemoComponent},
    {path: '/rating', name: 'RatingDemo', component: RatingDemoComponent},
    {path: '/password', name: 'PasswordDemo', component: PasswordDemoComponent},
    {path: '/dialog', name: 'DialogDemo', component: DialogDemoComponent},
    {path: '/togglebutton', name: 'ToggleButtonDemo', component: ToggleButtonDemoComponent},
    {path: '/grid', name: 'GridDemo', component: GridDemoComponent},
    {path: '/tabview', name: 'TabViewDemo', component: TabViewDemoComponent},
    {path: '/radiobutton', name: 'RadioButtonDemo', component: RadioButtonDemoComponent},
    {path: '/accordion', name: 'AccordionDemo', component: AccordionDemoComponent},
    {path: '/inputtextarea', name: 'InputTextareaDemo', component: InputTextareaDemoComponent},
    {path: '/galleria', name: 'GalleriaDemo', component: GalleriaDemoComponent},
    {path: '/checkbox', name: 'CheckboxDemo', component: CheckboxDemoComponent}
])
export class AppComponent {

    activeMenuId: string;

    themesVisible: boolean = false;

    mobileMenuActive: boolean = false;
}