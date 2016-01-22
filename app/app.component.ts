import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomePageComponent} from './homepage.component';
import {InputTextDemoComponent} from './components/inputtext/demo/inputtextdemo.component';
import {ButtonDemoComponent} from './components/button/demo/buttondemo.component';
import {SpinnerDemoComponent} from './components/spinner/demo/spinnerdemo.component';
import {PanelDemoComponent} from './components/panel/demo/paneldemo.component';
import {FieldsetDemoComponent} from './components/fieldset/demo/fieldsetdemo.component';
import {RatingDemoComponent} from './components/rating/demo/ratingdemo.component';
import {PasswordDemoComponent} from './components/password/demo/passworddemo.component';
import {DialogDemoComponent} from './components/dialog/demo/dialogdemo.component';
import {ToggleButtonDemoComponent} from './components/togglebutton/demo/togglebuttondemo.component';
import {GridDemoComponent} from './components/grid/demo/griddemo.component';
import {TabViewDemoComponent} from './components/tabview/demo/tabviewdemo.component';
import {RadioButtonDemoComponent} from './components/radiobutton/demo/radiobuttondemo.component';
import {AccordionDemoComponent} from './components/accordion/demo/accordiondemo.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'HomePage', component: HomePageComponent},
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
    {path: '/accordion', name: 'AccordionDemo', component: AccordionDemoComponent}
])
export class AppComponent {

}